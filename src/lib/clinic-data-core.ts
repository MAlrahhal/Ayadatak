import type { ClinicContent } from "../types/clinic";
import { CONTENT_SCHEMA_VERSION, mediaIdsInContent, validateClinicContent, type ContentIssue } from "./clinic-content-validation";
import { evaluatePublicAccess, permitsPublicRead, type EntitlementWindow } from "./clinic-entitlement";
import { isReservedClinicSlug, normalizeClinicSlug } from "./clinic-resolver";

// P5 alone may construct this type after verifying a provider session and mapping
// (provider, subject) to AppUser. This module deliberately exports no constructor.
declare const verifiedActorBrand: unique symbol;
export type VerifiedActor = { readonly userId: string; readonly [verifiedActorBrand]: true };

export type ClinicRow = {
  id: string;
  slug: string;
  operationalState: "ACTIVE" | "SUSPENDED";
  publicationState: "NEVER_PUBLISHED" | "PUBLISHED" | "UNPUBLISHED";
};
export type DraftRow = { content: unknown; schemaVersion: number; version: number; savedAt: Date };
export type PublishedRow = { content: unknown; schemaVersion: number; sourceDraftVersion: number; publicationNumber: number };

/** Every implementation must scope private lookups/writes by clinic ID. */
export interface ClinicDataStore {
  membership(clinicId: string, userId: string): Promise<{ role: "OWNER" | "MEMBER" } | null>;
  clinicById(clinicId: string): Promise<ClinicRow | null>;
  clinicBySlug(slug: string): Promise<ClinicRow | null>;
  entitlement(clinicId: string): Promise<EntitlementWindow | null>;
  draft(clinicId: string, ownerUserId: string): Promise<DraftRow | null>;
  published(clinicId: string): Promise<PublishedRow | null>;
  ownedMedia(clinicId: string, ids: readonly string[]): Promise<readonly { id: string; state: "PRIVATE_STAGED" | "PUBLIC_READY" }[]>;
  saveDraftIfVersion(input: {
    clinicId: string; userId: string; expectedVersion: number; schemaVersion: number;
    content: ClinicContent; savedAt: Date;
  }): Promise<boolean>;
}

export type DataFailure = { ok: false; code: "unauthenticated" | "forbidden" | "not-found" | "invalid" | "conflict" | "unsupported-schema" | "corrupt"; issues?: ContentIssue[] };
export type DataResult<T> = { ok: true; value: T } | DataFailure;

function identityMatches(content: ClinicContent, clinic: ClinicRow): boolean {
  return content.identity.id === clinic.id && content.identity.slug === clinic.slug;
}

async function mediaAllowed(store: ClinicDataStore, clinicId: string, content: ClinicContent, requireReady: boolean): Promise<boolean> {
  const ids = mediaIdsInContent(content);
  if (!ids.length) return true;
  const rows = await store.ownedMedia(clinicId, ids);
  const allowed = new Map(rows.map((item) => [item.id.toLowerCase(), item.state]));
  return ids.every((id) => allowed.has(id.toLowerCase()) && (!requireReady || allowed.get(id.toLowerCase()) === "PUBLIC_READY"));
}

export function createClinicDataService(
  store: ClinicDataStore,
  now: () => Date = () => new Date(),
  isVerifiedActor: (actor: VerifiedActor) => boolean = () => false,
) {
  function validActor(actor: VerifiedActor | null | undefined): actor is VerifiedActor {
    return Boolean(actor && typeof actor.userId === "string" && actor.userId.length > 0 && isVerifiedActor(actor));
  }
  async function authorizeOwner(actor: VerifiedActor | null | undefined, clinicId: string): Promise<DataResult<ClinicRow>> {
    if (!validActor(actor)) return { ok: false, code: "unauthenticated" };
    // Membership is checked before clinic existence to avoid disclosing other clinics.
    const membership = await store.membership(clinicId, actor.userId);
    if (!membership || membership.role !== "OWNER") return { ok: false, code: "forbidden" };
    const clinic = await store.clinicById(clinicId);
    return clinic ? { ok: true, value: clinic } : { ok: false, code: "not-found" };
  }

  async function getAuthorizedDraft(actor: VerifiedActor | null | undefined, clinicId: string): Promise<DataResult<DraftRow & { content: ClinicContent }>> {
    if (!validActor(actor)) return { ok: false, code: "unauthenticated" };
    const access = await authorizeOwner(actor, clinicId);
    if (!access.ok) return access;
    const row = await store.draft(clinicId, actor.userId);
    if (!row) return { ok: false, code: "not-found" };
    if (row.schemaVersion !== CONTENT_SCHEMA_VERSION) return { ok: false, code: "unsupported-schema" };
    const parsed = validateClinicContent(row.content, "draft");
    if (!parsed.ok || !identityMatches(parsed.content, access.value) || !await mediaAllowed(store, clinicId, parsed.content, false))
      return { ok: false, code: "corrupt" };
    return { ok: true, value: { ...row, content: parsed.content } };
  }

  async function saveDraft(actor: VerifiedActor | null | undefined, clinicId: string, expectedVersion: number,
    schemaVersion: number, incoming: unknown): Promise<DataResult<{ version: number; savedAt: Date }>> {
    if (!validActor(actor)) return { ok: false, code: "unauthenticated" };
    const access = await authorizeOwner(actor, clinicId);
    if (!access.ok) return access;
    if (schemaVersion !== CONTENT_SCHEMA_VERSION) return { ok: false, code: "unsupported-schema" };
    if (!Number.isSafeInteger(expectedVersion) || expectedVersion < 1) return { ok: false, code: "invalid" };
    const current = await store.draft(clinicId, actor.userId);
    if (!current) return { ok: false, code: "not-found" };
    if (current.schemaVersion !== CONTENT_SCHEMA_VERSION) return { ok: false, code: "unsupported-schema" };
    if (current.version !== expectedVersion) return { ok: false, code: "conflict" };
    const parsed = validateClinicContent(incoming, "draft");
    if (!parsed.ok) return { ok: false, code: "invalid", issues: parsed.issues };
    if (!identityMatches(parsed.content, access.value)) return { ok: false, code: "invalid", issues: [{ path: "$.identity", message: "Clinic identity does not match the authoritative record" }] };
    if (!await mediaAllowed(store, clinicId, parsed.content, false)) return { ok: false, code: "invalid", issues: [{ path: "$", message: "Media must belong to this clinic" }] };
    const savedAt = now();
    const updated = await store.saveDraftIfVersion({ clinicId, userId: actor.userId, expectedVersion,
      schemaVersion: CONTENT_SCHEMA_VERSION, content: parsed.content, savedAt });
    return updated ? { ok: true, value: { version: expectedVersion + 1, savedAt } } : { ok: false, code: "conflict" };
  }

  async function getPublishedBySlug(rawSlug: string): Promise<DataResult<{ clinicId: string; content: ClinicContent; publicationNumber: number }>> {
    const slug = normalizeClinicSlug(rawSlug);
    if (!slug || isReservedClinicSlug(slug)) return { ok: false, code: "not-found" };
    const clinic = await store.clinicBySlug(slug);
    if (!clinic || clinic.publicationState !== "PUBLISHED") return { ok: false, code: "not-found" };
    const access = evaluatePublicAccess(clinic.operationalState, await store.entitlement(clinic.id), now());
    if (!permitsPublicRead(access)) return { ok: false, code: "not-found" };
    const row = await store.published(clinic.id); // Never query ClinicDraft on the public path.
    if (!row || row.schemaVersion !== CONTENT_SCHEMA_VERSION) return { ok: false, code: "not-found" };
    const parsed = validateClinicContent(row.content, "publish");
    if (!parsed.ok || !identityMatches(parsed.content, clinic)) return { ok: false, code: "not-found" };
    if (!await mediaAllowed(store, clinic.id, parsed.content, true)) return { ok: false, code: "not-found" };
    return { ok: true, value: { clinicId: clinic.id, content: parsed.content, publicationNumber: row.publicationNumber } };
  }

  return { authorizeOwner, getAuthorizedDraft, saveDraft, getPublishedBySlug };
}
