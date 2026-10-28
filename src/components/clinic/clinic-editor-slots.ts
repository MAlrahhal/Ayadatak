import type { ReactNode } from "react";

export type ClinicEditableArea =
  | "identity" | "logo" | "hero" | "heroImage" | "about"
  | "services" | "doctors" | "testimonials" | "faq"
  | "location" | "workingHours" | "contact" | "socialLinks";

export type ClinicCollection = "services" | "doctors" | "testimonials" | "faq";

/** Optional presentation hooks. Public clinic routes omit these completely. */
export type ClinicEditorSlots = {
  edit: (area: ClinicEditableArea) => ReactNode;
  item: (collection: ClinicCollection, id: string, index: number, length: number) => ReactNode;
  add: (collection: ClinicCollection) => ReactNode;
};
