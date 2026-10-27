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
