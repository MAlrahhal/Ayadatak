import { demoClinic } from "../data/demo-clinic";
import type { ClinicContent, ClinicSectionVisibility } from "../types/clinic";
import { MAX_HERO_SLIDES, MIN_HERO_SLIDES } from "./clinic-hero-slides";

export const PROTOTYPE_STORAGE_KEY = "ayadatak:dashboard-demo:clinic-demo-alnoor:v1";
const STORAGE_VERSION = 1;

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
const isString = (value: unknown): value is string => typeof value === "string";
const isOptionalString = (value: unknown): boolean => value === undefined || isString(value);
const isImage = (value: unknown): boolean =>
  isObject(value) && isString(value.src) && isString(value.alt);
const isOptionalImage = (value: unknown): boolean => value === undefined || isImage(value);
const isOrdered = (value: unknown): boolean => isObject(value) && Number.isInteger(value.displayOrder);

const visibilityKeys: (keyof ClinicSectionVisibility)[] = [
  "about", "services", "doctors", "testimonials", "faq", "location", "workingHours", "contact", "socialLinks",
];
const weekdays = new Set(["saturday", "sunday", "monday", "tuesday", "wednesday", "thursday", "friday"]);
const socialPlatforms = new Set(["facebook", "instagram", "x", "youtube", "linkedin", "tiktok"]);

export function cloneInitialPrototype(): ClinicContent {
  return structuredClone(demoClinic);
}

export function isClinicPrototype(value: unknown): value is ClinicContent {
  if (!isObject(value) || !isObject(value.identity) || !isObject(value.hero) ||
      !isObject(value.contact) || !isObject(value.location) || !isObject(value.sectionVisibility)) return false;

  const { identity, hero, contact, location, sectionVisibility } = value;
  if (identity.id !== demoClinic.identity.id || identity.slug !== demoClinic.identity.slug ||
      !isString(identity.nameAr) || !isOptionalString(identity.tagline) || !isString(identity.about) ||
      !isOptionalImage(identity.logo) ||
      (identity.brandColors !== undefined && (!isObject(identity.brandColors) || !isString(identity.brandColors.primary) || !isOptionalString(identity.brandColors.accent)))) return false;
  if (!isString(hero.headline) || !isString(hero.description) || !Array.isArray(hero.slides) ||
      !hero.slides.every((slide) => isObject(slide) && isString(slide.id) && isImage(slide.image))) return false;
  if (!Array.isArray(value.services) || !value.services.every((item) =>
      isOrdered(item) && isString(item.id) && isString(item.name) && isOptionalString(item.description) &&
      isOptionalString(item.icon) && isOptionalImage(item.image))) return false;
  if (!Array.isArray(value.doctors) || !value.doctors.every((item) =>
      isOrdered(item) && isString(item.id) && isString(item.name) && isString(item.specialty) &&
      isOptionalString(item.biography) && (item.yearsOfExperience === undefined ||
      (typeof item.yearsOfExperience === "number" && Number.isFinite(item.yearsOfExperience))) && isOptionalImage(item.image))) return false;
  if (!Array.isArray(value.testimonials) || !value.testimonials.every((item) =>
      isOrdered(item) && isString(item.id) && isString(item.displayName) && isString(item.text))) return false;
  if (!Array.isArray(value.faq) || !value.faq.every((item) =>
      isOrdered(item) && isString(item.id) && isString(item.question) && isString(item.answer))) return false;
  if (!Array.isArray(value.workingHours) || !value.workingHours.every((item) =>
      isObject(item) && weekdays.has(item.day as string) && typeof item.isOpen === "boolean" &&
      Array.isArray(item.periods) && item.periods.every((period) =>
      isObject(period) && isString(period.opensAt) && isString(period.closesAt)))) return false;
  if (!isString(contact.phone) || !isOptionalString(contact.whatsapp) || !isOptionalString(contact.email) ||
      !isString(location.address) || !isOptionalString(location.mapUrl)) return false;
  if (!Array.isArray(value.socialLinks) || !value.socialLinks.every((link) =>
      isObject(link) && socialPlatforms.has(link.platform as string) && isString(link.url))) return false;
  return visibilityKeys.every((key) => typeof sectionVisibility[key] === "boolean");
}

export function serializePrototype(clinic: ClinicContent): string {
  return JSON.stringify({ version: STORAGE_VERSION, clinic });
}

export function parsePrototype(raw: string): ClinicContent | null {
  try {
    const envelope: unknown = JSON.parse(raw);
    if (!isObject(envelope) || envelope.version !== STORAGE_VERSION || !isClinicPrototype(envelope.clinic)) return null;
    const clinic = migrateLegacyDemoImages(envelope.clinic);
    return validatePrototype(clinic).length === 0 ? clinic : null;
  } catch {
    return null;
  }
}

/** Replace only the original P3.7 placeholder assets; retain all owner-edited fields. */
function migrateLegacyDemoImages(clinic: ClinicContent): ClinicContent {
  const next = structuredClone(clinic);
  const legacy = "https://example.com/ayadatak-demo-assets/";
  const replacements: Record<string, string> = {
    "logo.png": "/images/clinic-demo/al-noor-mark.svg",
    "clinic-reception.jpg": "/images/clinic-demo/clinic-reception.webp",
    "consultation-room.jpg": "/images/clinic-demo/clinic-corridor.webp",
    "care-team.jpg": "/images/clinic-demo/clinic-exterior.webp",
  };
  if (next.identity.logo?.src === `${legacy}logo.png`) next.identity.logo.src = replacements["logo.png"];
  next.hero.slides.forEach((slide) => {
    const file = slide.image.src.startsWith(legacy) ? slide.image.src.slice(legacy.length) : "";
    if (replacements[file]) slide.image.src = replacements[file];
  });
  next.doctors.forEach((doctor) => {
    if (doctor.image?.src.startsWith(legacy)) doctor.image = undefined;
  });
  return next;
}

export function getSectionPresentation(clinic: ClinicContent, key: keyof ClinicSectionVisibility): "hidden" | "empty" | "visible" {
  if (!clinic.sectionVisibility[key]) return "hidden";
  const hasContent: Record<keyof ClinicSectionVisibility, boolean> = {
    about: Boolean(clinic.identity.about.trim()),
    services: clinic.services.length > 0,
    doctors: clinic.doctors.length > 0,
    testimonials: clinic.testimonials.length > 0,
    faq: clinic.faq.length > 0,
    location: Boolean(clinic.location.address.trim()),
    workingHours: clinic.workingHours.length > 0,
    contact: Boolean(clinic.contact.phone.trim()),
    socialLinks: clinic.socialLinks.length > 0,
  };
  return hasContent[key] ? "visible" : "empty";
}

export function reorderItems<T extends { displayOrder: number }>(items: readonly T[], index: number, direction: -1 | 1): T[] {
  const ordered = [...items].sort((a, b) => a.displayOrder - b.displayOrder);
  const target = index + direction;
  if (index < 0 || target < 0 || target >= ordered.length) return ordered;
  [ordered[index], ordered[target]] = [ordered[target], ordered[index]];
  return ordered.map((item, position) => ({ ...item, displayOrder: position + 1 }));
}

const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;
const originalClinic: ClinicContent = demoClinic;
const originalImageSources = new Set([
  originalClinic.identity.logo?.src,
  ...originalClinic.hero.slides.map((slide) => slide.image.src),
  ...originalClinic.services.map((item) => item.image?.src),
  ...originalClinic.doctors.map((item) => item.image?.src),
].filter((src): src is string => Boolean(src)));
const validImageUrl = (src: string) => {
  if (!src.trim()) return true;
  if (originalImageSources.has(src)) return true;
  if (src.startsWith("/") && !src.startsWith("//") && !src.includes("..")) return true;
  try {
    const url = new URL(src);
    return (url.protocol === "https:" || url.protocol === "http:") && !url.username && !url.password &&
      url.hostname !== "example.com" && !url.hostname.endsWith(".example.com");
  } catch { return false; }
};
const validExternalUrl = (value: string) => {
  try {
    const url = new URL(value);
    return (url.protocol === "https:" || url.protocol === "http:") && !url.username && !url.password;
  } catch { return false; }
};

export function validatePrototype(clinic: ClinicContent): string[] {
  const errors: string[] = [];
  if (!clinic.identity.nameAr.trim()) errors.push("أدخل اسم العيادة.");
  if (!clinic.hero.headline.trim()) errors.push("أدخل عنوان الواجهة الرئيسية.");
  if (!clinic.hero.description.trim()) errors.push("أدخل وصف الواجهة الرئيسية.");
  if (!/^#[0-9a-fA-F]{6}$/.test(clinic.identity.brandColors?.primary ?? "")) errors.push("اختر لونًا رئيسيًا صالحًا.");
  if (clinic.hero.slides.length < MIN_HERO_SLIDES || clinic.hero.slides.length > MAX_HERO_SLIDES ||
      new Set(clinic.hero.slides.map((slide) => slide.id)).size !== clinic.hero.slides.length ||
      clinic.hero.slides.some((slide) => !slide.image.src.trim() || !slide.image.alt.trim()))
    errors.push("أضف من صورة واحدة إلى خمس صور للواجهة، مع وصف لكل صورة.");
  const images = [clinic.identity.logo, ...clinic.hero.slides.map((slide) => slide.image),
    ...clinic.services.map((item) => item.image), ...clinic.doctors.map((item) => item.image)];
  if (images.some((image) => image && !validImageUrl(image.src))) errors.push("تحقق من روابط الصور؛ استخدم رابط https أو مسارًا محليًا صالحًا.");
  if (clinic.services.some((item) => !item.name.trim())) errors.push("أدخل اسمًا لكل خدمة أو احذف الصف الفارغ.");
  if (clinic.doctors.some((item) => !item.name.trim() || !item.specialty.trim())) errors.push("أدخل اسم الطبيب وتخصصه لكل صف.");
  if (clinic.doctors.some((item) => item.yearsOfExperience !== undefined &&
      (!Number.isInteger(item.yearsOfExperience) || item.yearsOfExperience < 0 || item.yearsOfExperience > 80)))
    errors.push("سنوات الخبرة يجب أن تكون رقمًا صحيحًا بين 0 و80.");
  if (clinic.testimonials.some((item) => !item.displayName.trim() || !item.text.trim())) errors.push("أكمل اسم صاحب الرأي ونصه لكل رأي.");
  if (clinic.faq.some((item) => !item.question.trim() || !item.answer.trim())) errors.push("أكمل السؤال والجواب لكل بند.");
  if (clinic.workingHours.some((day) => day.isOpen && (day.periods.length === 0 || day.periods.some((period) =>
    !timePattern.test(period.opensAt) || !timePattern.test(period.closesAt) || period.opensAt >= period.closesAt))))
    errors.push("تحقق من فترات الدوام: وقت الإغلاق يجب أن يكون بعد وقت الفتح.");
  if (clinic.sectionVisibility.contact && !clinic.contact.phone.trim()) errors.push("أدخل رقم الهاتف أو أخفِ قسم التواصل.");
  if (clinic.contact.phone.trim() && !/^\+?\d{7,15}$/.test(clinic.contact.phone.replace(/[^+\d]/g, "")))
    errors.push("تحقق من رقم الهاتف.");
  if (clinic.contact.whatsapp?.trim() && !/^\d{7,15}$/.test(clinic.contact.whatsapp.replace(/\D/g, "")))
    errors.push("تحقق من رقم واتساب.");
  if (clinic.contact.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clinic.contact.email))
    errors.push("تحقق من البريد الإلكتروني.");
  if (clinic.location.mapUrl?.trim() && !validExternalUrl(clinic.location.mapUrl)) errors.push("تحقق من رابط الخريطة.");
  if (clinic.socialLinks.some((link) => !validExternalUrl(link.url))) errors.push("تحقق من روابط حسابات التواصل.");
  return errors;
}
