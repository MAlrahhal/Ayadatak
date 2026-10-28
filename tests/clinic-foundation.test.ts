import assert from "node:assert/strict";
import test from "node:test";
import { demoClinic } from "../src/data/demo-clinic";
import { sakeenaDemoClinic } from "../src/data/sakeena-demo-clinic";
import {
  getClinicNavigation,
  getPreviewSafeActionHref,
  getRenderableClinicSections,
} from "../src/components/clinic/clinic-utils";
import {
  getFixtureClinicSlugs,
  isReservedClinicSlug,
  normalizeClinicSlug,
  resolveClinicBySlug,
} from "../src/lib/clinic-resolver";
import { CLINIC_TEMPLATE_SECTION_ORDER } from "../src/types/clinic";
import type { ClinicContent } from "../src/types/clinic";
import {
  cloneInitialPrototype,
  getSectionPresentation,
  parsePrototype,
  reorderItems,
  serializePrototype,
  validatePrototype,
} from "../src/lib/dashboard-prototype";
import { addDraftItem, removeDraftItem, setDraftVisibility } from "../src/lib/visual-editor-draft";

const typedSakeenaDemoClinic: ClinicContent = sakeenaDemoClinic;

test("normalizes valid slugs and rejects malformed values", () => {
  assert.equal(normalizeClinicSlug("  Sakeena-Demo  "), "sakeena-demo");
  assert.equal(normalizeClinicSlug("clinic-123"), "clinic-123");

  for (const malformed of ["", "-clinic", "clinic-", "clinic_name", "clinic.example", "عيادة", "a".repeat(64)]) {
    assert.equal(normalizeClinicSlug(malformed), null, malformed);
  }
});

test("reserved clinic slugs are detected after normalization", async () => {
  assert.equal(isReservedClinicSlug(" ADMIN "), true);
  assert.equal(isReservedClinicSlug("demo"), false);

  const result = await resolveClinicBySlug("WWW");
  assert.deepEqual(result, { ok: false, slug: "www", reason: "reserved" });
});

test("resolves both fixture clinics independently", async () => {
  assert.deepEqual(getFixtureClinicSlugs(), ["demo", "sakeena-demo"]);

  const first = await resolveClinicBySlug("demo");
  const second = await resolveClinicBySlug("sakeena-demo");

  assert.equal(first.ok, true);
  assert.equal(second.ok, true);
  if (!first.ok || !second.ok) return;

  assert.equal(first.clinic.identity.nameAr, "عيادة النور");
  assert.equal(second.clinic.identity.nameAr, "عيادة السكينة التجريبية");
  assert.notEqual(first.clinic.identity.id, second.clinic.identity.id);
  assert.notEqual(first.clinic.services[0]?.name, second.clinic.services[0]?.name);
  assert.notEqual(first.clinic.contact.phone, second.clinic.contact.phone);
});

test("does not expose a mutable shared fixture object", async () => {
  const firstResolution = await resolveClinicBySlug("demo");
  assert.equal(firstResolution.ok, true);
  if (!firstResolution.ok) return;

  firstResolution.clinic.identity.nameAr = "اسم معدّل داخل الاختبار";
  firstResolution.clinic.sectionVisibility.services = false;

  const secondResolution = await resolveClinicBySlug("demo");
  assert.equal(secondResolution.ok, true);
  if (!secondResolution.ok) return;

  assert.equal(secondResolution.clinic.identity.nameAr, demoClinic.identity.nameAr);
  assert.equal(secondResolution.clinic.sectionVisibility.services, true);
});

test("returns distinct failure reasons without falling back to another clinic", async () => {
  assert.deepEqual(await resolveClinicBySlug("unknown-clinic"), {
    ok: false,
    slug: "unknown-clinic",
    reason: "not-found",
  });
  assert.deepEqual(await resolveClinicBySlug("bad_slug"), {
    ok: false,
    slug: null,
    reason: "invalid",
  });
});

test("keeps the required hero and fixed template section order", () => {
  assert.deepEqual(CLINIC_TEMPLATE_SECTION_ORDER, [
    "hero",
    "about",
    "services",
    "doctors",
    "testimonials",
    "faq",
    "location-contact",
  ]);

  for (const clinic of [demoClinic, sakeenaDemoClinic]) {
    assert.ok(clinic.hero.headline.trim());
    assert.ok(clinic.hero.slides.length > 0);
    assert.equal(getRenderableClinicSections(clinic)[0], "hero");
  }
});

test("omits hidden or empty sections from rendering and navigation", () => {
  assert.deepEqual(getRenderableClinicSections(demoClinic), [
    "hero",
    "about",
    "services",
    "doctors",
    "faq",
    "location-contact",
  ]);
  assert.deepEqual(getRenderableClinicSections(sakeenaDemoClinic), [
    "hero",
    "about",
    "services",
    "doctors",
    "location-contact",
  ]);

  const labels = getClinicNavigation(sakeenaDemoClinic).map((item) => item.label);
  assert.equal(labels.includes("آراء المراجعين"), false);
  assert.equal(labels.includes("الأسئلة الشائعة"), false);
});

test("supports optional fields and multiple working periods", () => {
  const serviceWithoutDescription = typedSakeenaDemoClinic.services.find((service) => !service.description);
  const doctorWithoutOptionalDetails = typedSakeenaDemoClinic.doctors.find(
    (doctor) => !doctor.biography && doctor.yearsOfExperience === undefined && !doctor.image,
  );
  const splitDay = typedSakeenaDemoClinic.workingHours.find((day) => day.periods.length === 2);

  assert.ok(serviceWithoutDescription);
  assert.ok(doctorWithoutOptionalDetails);
  assert.ok(splitDay);
  assert.equal(typedSakeenaDemoClinic.contact.email, undefined);
  assert.equal(typedSakeenaDemoClinic.contact.whatsapp, undefined);
});

test("preview mode disables real contact and external actions", () => {
  assert.equal(getPreviewSafeActionHref("tel:+962000000000", true), null);
  assert.equal(getPreviewSafeActionHref("https://example.com/map", true), null);
  assert.equal(getPreviewSafeActionHref("tel:+962000000000", false), "tel:+962000000000");
});

test("prototype draft is isolated and serialized with a versioned shape", () => {
  const draft = cloneInitialPrototype();
  draft.identity.nameAr = "عيادة نموذجية معدّلة";
  draft.sectionVisibility.doctors = false;
  const restored = parsePrototype(serializePrototype(draft));
  assert.equal(restored?.identity.nameAr, "عيادة نموذجية معدّلة");
  assert.equal(restored?.sectionVisibility.doctors, false);
  assert.equal(demoClinic.identity.nameAr, "عيادة النور");
  assert.equal(demoClinic.sectionVisibility.doctors, true);
});

test("prototype rejects corrupt, outdated, and unrelated clinic storage", () => {
  assert.equal(parsePrototype("{broken"), null);
  assert.equal(parsePrototype(JSON.stringify({ version: 2, clinic: demoClinic })), null);
  const otherClinic = structuredClone(demoClinic);
  otherClinic.identity.id = "another-clinic";
  assert.equal(parsePrototype(serializePrototype(otherClinic)), null);
});

test("visibility preserves content and differentiates hidden from empty", () => {
  const draft = cloneInitialPrototype();
  assert.equal(getSectionPresentation(draft, "doctors"), "visible");
  draft.sectionVisibility.doctors = false;
  assert.equal(getSectionPresentation(draft, "doctors"), "hidden");
  assert.equal(draft.doctors.length, demoClinic.doctors.length);
  draft.sectionVisibility.doctors = true;
  draft.doctors = [];
  assert.equal(getSectionPresentation(draft, "doctors"), "empty");
  assert.equal(getRenderableClinicSections(draft).includes("doctors"), false);
});

test("prototype validates required fields and reorders display items", () => {
  const draft = cloneInitialPrototype();
  draft.identity.nameAr = "";
  assert.ok(validatePrototype(draft).some((message) => message.includes("اسم العيادة")));
  const moved = reorderItems(draft.services, 1, -1);
  assert.equal(moved[0].id, draft.services[1].id);
  assert.deepEqual(moved.map((item) => item.displayOrder), [1, 2, 3, 4]);
  assert.equal(draft.services[0].id, demoClinic.services[0].id);
});

test("prototype rejects invalid contact links and incomplete visible contact", () => {
  const draft = cloneInitialPrototype();
  draft.contact.phone = "";
  draft.location.mapUrl = "javascript:alert(1)";
  assert.ok(validatePrototype(draft).some((message) => message.includes("رقم الهاتف")));
  assert.ok(validatePrototype(draft).some((message) => message.includes("رابط الخريطة")));
});

test("visual editor separates immediate working changes from the saved snapshot", () => {
  const saved = cloneInitialPrototype();
  const stored = serializePrototype(saved);
  const working = structuredClone(saved);
  working.identity.nameAr = "اسم غير محفوظ";
  working.hero.headline = "عنوان غير محفوظ";
  assert.equal(parsePrototype(stored)?.identity.nameAr, demoClinic.identity.nameAr);
  assert.equal(parsePrototype(stored)?.hero.headline, demoClinic.hero.headline);
  assert.equal(parsePrototype(serializePrototype(working))?.identity.nameAr, "اسم غير محفوظ");
  assert.equal(demoClinic.identity.nameAr, "عيادة النور");
});

test("visual editor hides and restores a section without discarding its content", () => {
  const initial = cloneInitialPrototype();
  const hidden = setDraftVisibility(initial, "doctors", false);
  assert.equal(hidden.doctors.length, initial.doctors.length);
  assert.equal(getRenderableClinicSections(hidden).includes("doctors"), false);
  assert.equal(getClinicNavigation(hidden).some((item) => item.href === "#doctors"), false);
  const restored = setDraftVisibility(hidden, "doctors", true);
  assert.equal(getRenderableClinicSections(restored).includes("doctors"), true);
  assert.deepEqual(restored.doctors, initial.doctors);
  assert.equal(initial.sectionVisibility.doctors, true);
});

test("visual editor can add and remove services and doctors in a draft only", () => {
  const initial = cloneInitialPrototype();
  const withService = addDraftItem(initial, "services", "new-service");
  assert.equal(withService.services.length, initial.services.length + 1);
  assert.equal(withService.services.at(-1)?.id, "new-service");
  const withDoctor = addDraftItem(withService, "doctors", "new-doctor");
  assert.equal(withDoctor.doctors.length, initial.doctors.length + 1);
  const withoutService = removeDraftItem(withDoctor, "services", "new-service");
  const withoutDoctor = removeDraftItem(withoutService, "doctors", "new-doctor");
  assert.deepEqual(withoutDoctor.services, initial.services);
  assert.deepEqual(withoutDoctor.doctors, initial.doctors);
  assert.equal(demoClinic.services.length, initial.services.length);
});

test("visual editor reset source remains an independent original fixture copy", () => {
  const modified = addDraftItem(cloneInitialPrototype(), "services", "temporary");
  modified.identity.nameAr = "اسم معدل";
  const reset = cloneInitialPrototype();
  assert.equal(reset.identity.nameAr, demoClinic.identity.nameAr);
  assert.equal(reset.services.some((item) => item.id === "temporary"), false);
});
