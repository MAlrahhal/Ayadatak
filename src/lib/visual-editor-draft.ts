import type { ClinicContent, ClinicSectionVisibility } from "../types/clinic";

export type EditableCollection = "services" | "doctors" | "testimonials" | "faq";

/** Pure draft operations keep the fixture and saved snapshot untouched. */
export function addDraftItem(clinic: ClinicContent, collection: EditableCollection, id: string): ClinicContent {
  const next = structuredClone(clinic);
  const order = Math.max(0, ...next[collection].map((item) => item.displayOrder)) + 1;
  if (collection === "services") next.services = [...next.services, { id, name: "", description: "", displayOrder: order }];
  if (collection === "doctors") next.doctors = [...next.doctors, { id, name: "", specialty: "", displayOrder: order }];
  if (collection === "testimonials") next.testimonials = [...next.testimonials, { id, displayName: "", text: "", displayOrder: order }];
  if (collection === "faq") next.faq = [...next.faq, { id, question: "", answer: "", displayOrder: order }];
  next.sectionVisibility[collection] = true;
  return next;
}

export function removeDraftItem(clinic: ClinicContent, collection: EditableCollection, id: string): ClinicContent {
  const next = structuredClone(clinic);
  if (collection === "services") next.services = next.services.filter((item) => item.id !== id);
  if (collection === "doctors") next.doctors = next.doctors.filter((item) => item.id !== id);
  if (collection === "testimonials") next.testimonials = next.testimonials.filter((item) => item.id !== id);
  if (collection === "faq") next.faq = next.faq.filter((item) => item.id !== id);
  return next;
}

export function setDraftVisibility(clinic: ClinicContent, section: keyof ClinicSectionVisibility, visible: boolean): ClinicContent {
  const next = structuredClone(clinic);
  next.sectionVisibility[section] = visible;
  return next;
}
