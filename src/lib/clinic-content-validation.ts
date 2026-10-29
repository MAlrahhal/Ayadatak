import type { ClinicContent } from "../types/clinic";

export const CONTENT_SCHEMA_VERSION = 1;
export const CONTENT_LIMITS = {
  documentBytes: 200_000,
  id: 100,
  name: 120,
  shortText: 200,
  text: 3_000,
  url: 2_048,
  services: 30,
  doctors: 30,
  testimonials: 20,
  faq: 30,
  socialLinks: 6,
  periodsPerDay: 3,
} as const;

export type ContentIssue = { path: string; message: string };
export type ContentValidation =
  | { ok: true; content: ClinicContent }
  | { ok: false; issues: ContentIssue[] };

const weekdays = new Set(["saturday", "sunday", "monday", "tuesday", "wednesday", "thursday", "friday"]);
const platforms = new Set(["facebook", "instagram", "x", "youtube", "linkedin", "tiktok"]);
const visibilityKeys = ["about", "services", "doctors", "testimonials", "faq", "location", "workingHours", "contact", "socialLinks"];
const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;
const mediaPattern = /^media:([0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/i;
const localImagePattern = /^\/images\/[a-zA-Z0-9/_-]+\.(?:png|jpe?g|webp|avif|svg)$/;

function issue(issues: ContentIssue[], path: string, message: string): void {
  issues.push({ path, message });
}

function object(value: unknown, path: string, keys: readonly string[], issues: ContentIssue[]): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    issue(issues, path, "Expected an object");
    return {};
  }
  const result = value as Record<string, unknown>;
  for (const key of Object.keys(result)) if (!keys.includes(key)) issue(issues, `${path}.${key}`, "Unsupported field");
  return result;
}

function string(value: unknown, path: string, max: number, issues: ContentIssue[], required = true): string {
  if (typeof value !== "string" || value.length > max || (required && !value.trim())) {
    issue(issues, path, `Expected ${required ? "non-empty " : ""}text of at most ${max} characters`);
    return "";
  }
  return value;
}

function optionalString(value: unknown, path: string, max: number, issues: ContentIssue[]): void {
  if (value !== undefined) string(value, path, max, issues, false);
}

function list(value: unknown, path: string, max: number, issues: ContentIssue[]): unknown[] {
  if (!Array.isArray(value) || value.length > max) {
    issue(issues, path, `Expected an array of at most ${max} items`);
    return [];
  }
  return value;
}

function safeUrl(value: string): boolean {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    return url.protocol === "https:" && !url.username && !url.password && !url.port &&
      !url.hash && host !== "localhost" && !host.endsWith(".localhost") &&
      host.includes(".") && !host.startsWith("[") && !/^\d+\.\d+\.\d+\.\d+$/.test(host) &&
      !/^(?:127\.|10\.|192\.168\.|169\.254\.|172\.(?:1[6-9]|2\d|3[01])\.)/.test(host) &&
      host !== "0.0.0.0" && host !== "[::1]";
  } catch { return false; }
}

function image(value: unknown, path: string, issues: ContentIssue[], publish: boolean): void {
  const item = object(value, path, ["src", "alt"], issues);
  const src = string(item.src, `${path}.src`, CONTENT_LIMITS.url, issues, publish);
  string(item.alt, `${path}.alt`, CONTENT_LIMITS.shortText, issues, publish);
  if (src && !mediaPattern.test(src) && !localImagePattern.test(src) && !safeUrl(src))
    issue(issues, `${path}.src`, "Use a media UUID, safe /images/ path, or HTTPS URL");
}

function collection(value: unknown, path: string, max: number, keys: readonly string[], issues: ContentIssue[],
  inspect: (item: Record<string, unknown>, path: string) => void): void {
  const seenIds = new Set<string>();
  const seenOrders = new Set<number>();
  list(value, path, max, issues).forEach((entry, index) => {
    const itemPath = `${path}[${index}]`;
    const item = object(entry, itemPath, keys, issues);
    const id = string(item.id, `${itemPath}.id`, CONTENT_LIMITS.id, issues);
    if (id && seenIds.has(id)) issue(issues, `${itemPath}.id`, "Duplicate item ID");
    seenIds.add(id);
    if (!Number.isSafeInteger(item.displayOrder) || (item.displayOrder as number) < 1)
      issue(issues, `${itemPath}.displayOrder`, "Expected a positive integer");
    else if (seenOrders.has(item.displayOrder as number)) issue(issues, `${itemPath}.displayOrder`, "Duplicate order");
    else seenOrders.add(item.displayOrder as number);
    inspect(item, itemPath);
  });
}

/** Structural draft checks always apply; publishing adds required-content checks. */
export function validateClinicContent(value: unknown, mode: "draft" | "publish"): ContentValidation {
  const issues: ContentIssue[] = [];
  const publish = mode === "publish";
  let bytes = Infinity;
  try { bytes = new TextEncoder().encode(JSON.stringify(value)).length; } catch { /* invalid input */ }
  if (bytes > CONTENT_LIMITS.documentBytes) issue(issues, "$", "Document exceeds 200000 UTF-8 bytes");
  const root = object(value, "$", ["identity", "hero", "services", "doctors", "testimonials", "faq", "workingHours", "contact", "location", "socialLinks", "sectionVisibility"], issues);
  const identity = object(root.identity, "$.identity", ["id", "slug", "nameAr", "tagline", "about", "logo", "brandColors"], issues);
  string(identity.id, "$.identity.id", CONTENT_LIMITS.id, issues);
  string(identity.slug, "$.identity.slug", 63, issues);
  string(identity.nameAr, "$.identity.nameAr", CONTENT_LIMITS.name, issues, publish);
  optionalString(identity.tagline, "$.identity.tagline", CONTENT_LIMITS.shortText, issues);
  string(identity.about, "$.identity.about", CONTENT_LIMITS.text, issues, false);
  if (identity.logo !== undefined) image(identity.logo, "$.identity.logo", issues, publish);
  if (identity.brandColors !== undefined) {
    const colors = object(identity.brandColors, "$.identity.brandColors", ["primary", "accent"], issues);
    if (typeof colors.primary !== "string" || !/^#[0-9a-fA-F]{6}$/.test(colors.primary)) issue(issues, "$.identity.brandColors.primary", "Expected #RRGGBB");
    if (colors.accent !== undefined && (typeof colors.accent !== "string" || !/^#[0-9a-fA-F]{6}$/.test(colors.accent))) issue(issues, "$.identity.brandColors.accent", "Expected #RRGGBB");
  }

  const hero = object(root.hero, "$.hero", ["headline", "description", "slides"], issues);
  string(hero.headline, "$.hero.headline", 160, issues, publish);
  string(hero.description, "$.hero.description", 600, issues, publish);
  const slides = list(hero.slides, "$.hero.slides", 5, issues);
  if (slides.length < 1) issue(issues, "$.hero.slides", "At least one slide is required");
  const slideIds = new Set<string>();
  slides.forEach((entry, index) => {
    const path = `$.hero.slides[${index}]`;
    const slide = object(entry, path, ["id", "image"], issues);
    const id = string(slide.id, `${path}.id`, CONTENT_LIMITS.id, issues);
    if (id && slideIds.has(id)) issue(issues, `${path}.id`, "Duplicate slide ID");
    slideIds.add(id);
    image(slide.image, `${path}.image`, issues, publish);
  });

  collection(root.services, "$.services", CONTENT_LIMITS.services, ["id", "name", "description", "image", "icon", "displayOrder"], issues, (item, path) => {
    string(item.name, `${path}.name`, CONTENT_LIMITS.name, issues, publish);
    optionalString(item.description, `${path}.description`, CONTENT_LIMITS.text, issues);
    optionalString(item.icon, `${path}.icon`, CONTENT_LIMITS.id, issues);
    if (item.image !== undefined) image(item.image, `${path}.image`, issues, publish);
  });
  collection(root.doctors, "$.doctors", CONTENT_LIMITS.doctors, ["id", "name", "specialty", "biography", "yearsOfExperience", "image", "displayOrder"], issues, (item, path) => {
    string(item.name, `${path}.name`, CONTENT_LIMITS.name, issues, publish);
    string(item.specialty, `${path}.specialty`, CONTENT_LIMITS.name, issues, publish);
    optionalString(item.biography, `${path}.biography`, CONTENT_LIMITS.text, issues);
    if (item.yearsOfExperience !== undefined && (!Number.isSafeInteger(item.yearsOfExperience) || (item.yearsOfExperience as number) < 0 || (item.yearsOfExperience as number) > 80)) issue(issues, `${path}.yearsOfExperience`, "Expected 0–80 years");
    if (item.image !== undefined) image(item.image, `${path}.image`, issues, publish);
  });
  collection(root.testimonials, "$.testimonials", CONTENT_LIMITS.testimonials, ["id", "displayName", "text", "displayOrder"], issues, (item, path) => {
    string(item.displayName, `${path}.displayName`, CONTENT_LIMITS.name, issues, publish);
    string(item.text, `${path}.text`, CONTENT_LIMITS.text, issues, publish);
  });
  collection(root.faq, "$.faq", CONTENT_LIMITS.faq, ["id", "question", "answer", "displayOrder"], issues, (item, path) => {
    string(item.question, `${path}.question`, CONTENT_LIMITS.shortText, issues, publish);
    string(item.answer, `${path}.answer`, CONTENT_LIMITS.text, issues, publish);
  });

  const seenDays = new Set<string>();
  list(root.workingHours, "$.workingHours", 7, issues).forEach((entry, index) => {
    const path = `$.workingHours[${index}]`;
    const day = object(entry, path, ["day", "isOpen", "periods"], issues);
    if (!weekdays.has(day.day as string) || seenDays.has(day.day as string)) issue(issues, `${path}.day`, "Invalid or duplicate weekday");
    seenDays.add(day.day as string);
    if (typeof day.isOpen !== "boolean") issue(issues, `${path}.isOpen`, "Expected boolean");
    const periods = list(day.periods, `${path}.periods`, CONTENT_LIMITS.periodsPerDay, issues);
    if (day.isOpen === false && periods.length) issue(issues, `${path}.periods`, "Closed day cannot have periods");
    if (publish && day.isOpen === true && !periods.length) issue(issues, `${path}.periods`, "Open day requires a period");
    let lastClose = "";
    periods.forEach((entry, periodIndex) => {
      const periodPath = `${path}.periods[${periodIndex}]`;
      const period = object(entry, periodPath, ["opensAt", "closesAt"], issues);
      const open = string(period.opensAt, `${periodPath}.opensAt`, 5, issues);
      const close = string(period.closesAt, `${periodPath}.closesAt`, 5, issues);
      if (!timePattern.test(open) || !timePattern.test(close) || open >= close || (lastClose && open < lastClose)) issue(issues, periodPath, "Invalid or overlapping HH:mm period");
      lastClose = close;
    });
  });
  const contact = object(root.contact, "$.contact", ["phone", "whatsapp", "email"], issues);
  const phone = string(contact.phone, "$.contact.phone", 32, issues, false);
  if (phone && !/^\+?[\d\s()-]{7,32}$/.test(phone)) issue(issues, "$.contact.phone", "Invalid phone");
  optionalString(contact.whatsapp, "$.contact.whatsapp", 32, issues);
  if (typeof contact.whatsapp === "string" && contact.whatsapp && !/^\+?[\d\s()-]{7,32}$/.test(contact.whatsapp)) issue(issues, "$.contact.whatsapp", "Invalid WhatsApp number");
  optionalString(contact.email, "$.contact.email", 254, issues);
  if (typeof contact.email === "string" && contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) issue(issues, "$.contact.email", "Invalid email");
  const location = object(root.location, "$.location", ["address", "mapUrl"], issues);
  string(location.address, "$.location.address", 500, issues, false);
  optionalString(location.mapUrl, "$.location.mapUrl", CONTENT_LIMITS.url, issues);
  if (typeof location.mapUrl === "string" && location.mapUrl && !safeUrl(location.mapUrl)) issue(issues, "$.location.mapUrl", "Expected safe HTTPS URL");
  list(root.socialLinks, "$.socialLinks", CONTENT_LIMITS.socialLinks, issues).forEach((entry, index) => {
    const path = `$.socialLinks[${index}]`;
    const link = object(entry, path, ["platform", "url"], issues);
    if (!platforms.has(link.platform as string)) issue(issues, `${path}.platform`, "Unsupported platform");
    const url = string(link.url, `${path}.url`, CONTENT_LIMITS.url, issues);
    if (url && !safeUrl(url)) issue(issues, `${path}.url`, "Expected safe HTTPS URL");
  });
  const visibility = object(root.sectionVisibility, "$.sectionVisibility", visibilityKeys, issues);
  for (const key of visibilityKeys) if (typeof visibility[key] !== "boolean") issue(issues, `$.sectionVisibility.${key}`, "Expected boolean");
  if (publish && visibility.contact === true && !phone.trim()) issue(issues, "$.contact.phone", "Visible contact requires phone");
  if (publish && visibility.about === true && !(identity.about as string)?.trim()) issue(issues, "$.identity.about", "Visible about requires text");
  if (publish && visibility.location === true && !(location.address as string)?.trim()) issue(issues, "$.location.address", "Visible location requires address");
  return issues.length ? { ok: false, issues } : { ok: true, content: value as ClinicContent };
}

export function mediaIdsInContent(content: ClinicContent): string[] {
  const images = [content.identity.logo, ...content.hero.slides.map((slide) => slide.image),
    ...content.services.map((item) => item.image), ...content.doctors.map((item) => item.image)];
  return [...new Set(images.flatMap((item) => item?.src.match(mediaPattern)?.[1] ?? []))];
}
