import assert from "node:assert/strict";
import test from "node:test";
import { demoClinic } from "../src/data/demo-clinic";
import { CONTENT_SCHEMA_VERSION, validateClinicContent } from "../src/lib/clinic-content-validation";
import { createClinicDataService, type ClinicDataStore, type ClinicRow, type VerifiedActor } from "../src/lib/clinic-data-core";
import { evaluatePublicAccess, GRACE_PERIOD_MS } from "../src/lib/clinic-entitlement";
import type { ClinicContent } from "../src/types/clinic";

const actor = (userId: string) => ({ userId }) as VerifiedActor; // Test-only stand-in; no runtime constructor exists.
const clinic: ClinicRow = { id: demoClinic.identity.id, slug: demoClinic.identity.slug, operationalState: "ACTIVE", publicationState: "PUBLISHED" };
const clone = (): ClinicContent => structuredClone(demoClinic);
const testService = (store: ClinicDataStore, now: () => Date = () => new Date()) =>
  createClinicDataService(store, now, (candidate) => ["owner", "member", "other"].includes(candidate.userId));

function fixture() {
  const draft = { content: clone() as unknown, schemaVersion: 1, version: 1, savedAt: new Date("2026-01-01T00:00:00Z") };
  const published = { content: clone() as unknown, schemaVersion: 1, sourceDraftVersion: 1, publicationNumber: 1 };
  const membership = new Map([['owner', 'OWNER'], ['member', 'MEMBER']]);
  const media = new Map<string, "PRIVATE_STAGED" | "PUBLIC_READY">();
  let draftReads = 0;
  let publishedReads = 0;
  let writes = 0;
  let entitlement = { startsAt: new Date("2026-01-01T00:00:00Z"), endsAt: new Date("2026-12-01T00:00:00Z"), accessExtendedUntil: null as Date | null };
  const store: ClinicDataStore = {
    async membership(clinicId, userId) { return clinicId === clinic.id && membership.has(userId) ? { role: membership.get(userId) as "OWNER" | "MEMBER" } : null; },
    async clinicById(id) { return id === clinic.id ? clinic : null; },
    async clinicBySlug(slug) { return slug === clinic.slug ? clinic : null; },
    async entitlement(clinicId) { return clinicId === clinic.id ? entitlement : null; },
    async draft(clinicId, ownerUserId) { draftReads++; return clinicId === clinic.id && membership.get(ownerUserId) === "OWNER" ? draft : null; },
    async published(clinicId) { publishedReads++; return clinicId === clinic.id ? published : null; },
    async ownedMedia(clinicId, ids) { return clinicId === clinic.id ? ids.filter((id) => media.has(id)).map((id) => ({ id, state: media.get(id)! })) : []; },
    async saveDraftIfVersion({ clinicId, userId, expectedVersion, schemaVersion, content, savedAt }) {
      if (clinicId !== clinic.id || membership.get(userId) !== "OWNER" || draft.version !== expectedVersion || draft.schemaVersion !== schemaVersion) return false;
      draft.content = structuredClone(content); draft.version++; draft.savedAt = savedAt; writes++; return true;
    },
  };
  return { store, clinic, draft, published, membership, media, setEntitlement: (value: typeof entitlement) => { entitlement = value; },
    reads: () => ({ draftReads, publishedReads, writes }) };
}

test("draft and publish validation preserve the current content shape with bounded inputs", () => {
  assert.equal(validateClinicContent(clone(), "draft").ok, true);
  assert.equal(validateClinicContent(clone(), "publish").ok, true);
  const incomplete = clone(); incomplete.hero.headline = ""; incomplete.identity.nameAr = "";
  assert.equal(validateClinicContent(incomplete, "draft").ok, true);
  assert.equal(validateClinicContent(incomplete, "publish").ok, false);
  const invalid = clone(); invalid.identity.brandColors!.primary = "blue";
  invalid.workingHours[0].periods = [{ opensAt: "10:00", closesAt: "12:00" }, { opensAt: "11:00", closesAt: "13:00" }];
  invalid.socialLinks[0].url = "javascript:alert(1)";
  invalid.services[1].id = invalid.services[0].id;
  const result = validateClinicContent(invalid, "draft");
  assert.equal(result.ok, false);
  if (!result.ok) assert.ok(result.issues.length >= 4);
});

test("owner can read and save only their clinic, while missing actor and MEMBER fail closed", async () => {
  const f = fixture(); const service = testService(f.store);
  assert.deepEqual(await createClinicDataService(f.store).getAuthorizedDraft(actor("owner"), clinic.id), { ok: false, code: "unauthenticated" });
  assert.equal((await service.getAuthorizedDraft(actor("owner"), clinic.id)).ok, true);
  assert.deepEqual(await service.getAuthorizedDraft(null, clinic.id), { ok: false, code: "unauthenticated" });
  assert.deepEqual(await service.getAuthorizedDraft(actor("other"), clinic.id), { ok: false, code: "forbidden" });
  assert.deepEqual(await service.getAuthorizedDraft(actor("owner"), "another-clinic"), { ok: false, code: "forbidden" });
  assert.deepEqual(await service.saveDraft(actor("member"), clinic.id, 1, 1, clone()), { ok: false, code: "forbidden" });
  const updated = clone(); updated.identity.about = "Updated draft only";
  const saved = await service.saveDraft(actor("owner"), clinic.id, 1, 1, updated);
  assert.equal(saved.ok, true);
  assert.equal(f.draft.version, 2);
  assert.equal((f.draft.content as ClinicContent).identity.about, "Updated draft only");
  assert.notEqual((f.published.content as ClinicContent).identity.about, "Updated draft only");
  assert.equal(f.reads().writes, 1);
  assert.deepEqual(await service.saveDraft(actor("owner"), clinic.id, 1, 1, updated), { ok: false, code: "conflict" });
  assert.equal(f.reads().writes, 1);
});

test("invalid identity, cross-clinic media, schema mismatch, and malformed content cannot be saved", async () => {
  const f = fixture(); const service = testService(f.store);
  const wrongClinic = clone(); wrongClinic.identity.id = "another-clinic";
  assert.equal((await service.saveDraft(actor("owner"), clinic.id, 1, 1, wrongClinic)).ok, false);
  const invalid = clone(); invalid.hero.slides = [];
  assert.equal((await service.saveDraft(actor("owner"), clinic.id, 1, 1, invalid)).ok, false);
  const mediaRef = clone(); mediaRef.identity.logo!.src = "media:123e4567-e89b-42d3-a456-426614174000";
  assert.equal((await service.saveDraft(actor("owner"), clinic.id, 1, 1, mediaRef)).ok, false);
  f.media.set("123e4567-e89b-42d3-a456-426614174000", "PRIVATE_STAGED");
  assert.equal((await service.saveDraft(actor("owner"), clinic.id, 1, 1, mediaRef)).ok, true);
  f.media.delete("123e4567-e89b-42d3-a456-426614174000");
  assert.deepEqual(await service.getAuthorizedDraft(actor("owner"), clinic.id), { ok: false, code: "corrupt" });
  assert.deepEqual(await service.saveDraft(actor("owner"), clinic.id, 2, 2, clone()), { ok: false, code: "unsupported-schema" });
  f.draft.schemaVersion = 2;
  assert.deepEqual(await service.getAuthorizedDraft(actor("owner"), clinic.id), { ok: false, code: "unsupported-schema" });
  assert.equal(f.reads().writes, 1);
});

test("published reads are separate from drafts and respect state, entitlement, and media readiness", async () => {
  const f = fixture();
  const service = testService(f.store, () => new Date("2026-06-01T00:00:00Z"));
  assert.equal((await service.getPublishedBySlug("DEMO")).ok, true);
  assert.equal(f.reads().draftReads, 0);
  assert.equal(f.reads().publishedReads, 1);
  clinic.operationalState = "SUSPENDED";
  assert.deepEqual(await service.getPublishedBySlug("demo"), { ok: false, code: "not-found" });
  clinic.operationalState = "ACTIVE";
  clinic.publicationState = "UNPUBLISHED";
  assert.deepEqual(await service.getPublishedBySlug("demo"), { ok: false, code: "not-found" });
  clinic.publicationState = "PUBLISHED";
  f.setEntitlement({ startsAt: new Date("2026-01-01T00:00:00Z"), endsAt: new Date("2026-01-02T00:00:00Z"), accessExtendedUntil: null });
  assert.deepEqual(await service.getPublishedBySlug("demo"), { ok: false, code: "not-found" });
  assert.equal(f.reads().draftReads, 0);
  f.setEntitlement({ startsAt: new Date("2026-01-01T00:00:00Z"), endsAt: new Date("2026-12-01T00:00:00Z"), accessExtendedUntil: null });
  const withMedia = clone(); withMedia.identity.logo!.src = "media:123e4567-e89b-42d3-a456-426614174000";
  f.published.content = withMedia;
  f.media.set("123e4567-e89b-42d3-a456-426614174000", "PRIVATE_STAGED");
  assert.deepEqual(await service.getPublishedBySlug("demo"), { ok: false, code: "not-found" });
  f.media.set("123e4567-e89b-42d3-a456-426614174000", "PUBLIC_READY");
  assert.equal((await service.getPublishedBySlug("demo")).ok, true);
  assert.equal(f.reads().draftReads, 0);
});

test("entitlement boundaries are exact UTC instants and suspension overrides extensions", () => {
  const startsAt = new Date("2026-01-01T00:00:00Z");
  const endsAt = new Date("2026-02-01T00:00:00Z");
  const window = { startsAt, endsAt, accessExtendedUntil: null as Date | null };
  const at = (ms: number) => new Date(ms);
  assert.equal(evaluatePublicAccess("ACTIVE", window, at(endsAt.getTime() - 1)), "active");
  assert.equal(evaluatePublicAccess("ACTIVE", window, endsAt), "grace");
  assert.equal(evaluatePublicAccess("ACTIVE", window, at(endsAt.getTime() + GRACE_PERIOD_MS - 1)), "grace");
  assert.equal(evaluatePublicAccess("ACTIVE", window, at(endsAt.getTime() + GRACE_PERIOD_MS)), "expired");
  window.accessExtendedUntil = at(endsAt.getTime() + GRACE_PERIOD_MS + 60_000);
  assert.equal(evaluatePublicAccess("ACTIVE", window, at(endsAt.getTime() + GRACE_PERIOD_MS)), "extended");
  assert.equal(evaluatePublicAccess("ACTIVE", window, window.accessExtendedUntil), "expired");
  assert.equal(evaluatePublicAccess("SUSPENDED", window, endsAt), "suspended");
  assert.equal(evaluatePublicAccess("ACTIVE", null, endsAt), "missing");
  assert.equal(evaluatePublicAccess("ACTIVE", window, at(startsAt.getTime() - 1)), "not-started");
});

test("schema version constant is explicit and unsupported public documents fail closed", async () => {
  assert.equal(CONTENT_SCHEMA_VERSION, 1);
  const f = fixture(); f.published.schemaVersion = 2;
  const service = testService(f.store, () => new Date("2026-06-01T00:00:00Z"));
  assert.deepEqual(await service.getPublishedBySlug("demo"), { ok: false, code: "not-found" });
  assert.equal(f.reads().draftReads, 0);
});
