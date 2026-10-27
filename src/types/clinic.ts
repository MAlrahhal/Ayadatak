export type ClinicImage = {
  src: string;
  alt: string;
};

export type ClinicBrandColors = {
  primary: string;
  accent?: string;
};

export type ClinicIdentity = {
  id: string;
  slug: string;
  nameAr: string;
  tagline?: string;
  about: string;
  logo?: ClinicImage;
  brandColors?: ClinicBrandColors;
};

export type ClinicHeroSlide = {
  id: string;
  image: ClinicImage;
};

export type ClinicHero = {
  headline: string;
  description: string;
  slides: readonly ClinicHeroSlide[];
};

export type ClinicService = {
  id: string;
  name: string;
  description?: string;
  image?: ClinicImage;
  icon?: string;
  displayOrder: number;
};

export type ClinicDoctor = {
  id: string;
  name: string;
  specialty: string;
  biography?: string;
  yearsOfExperience?: number;
  image?: ClinicImage;
  displayOrder: number;
};

export type ClinicTestimonial = {
  id: string;
  displayName: string;
  text: string;
  displayOrder: number;
};

export type ClinicFaqEntry = {
  id: string;
  question: string;
  answer: string;
  displayOrder: number;
};

export type ClinicDayOfWeek =
  | "saturday"
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday";

export type ClinicWorkingPeriod = {
  opensAt: string;
  closesAt: string;
};

export type ClinicWorkingDay = {
  day: ClinicDayOfWeek;
  isOpen: boolean;
  periods: readonly ClinicWorkingPeriod[];
};

export type ClinicContact = {
  phone: string;
  whatsapp?: string;
  email?: string;
};

export type ClinicLocation = {
  address: string;
  mapUrl?: string;
};

export type ClinicSocialPlatform =
  | "facebook"
  | "instagram"
  | "x"
  | "youtube"
  | "linkedin"
  | "tiktok";

export type ClinicSocialLink = {
  platform: ClinicSocialPlatform;
  url: string;
};

export type ClinicSectionVisibility = {
  about: boolean;
  services: boolean;
  doctors: boolean;
  testimonials: boolean;
  faq: boolean;
  location: boolean;
  workingHours: boolean;
  contact: boolean;
  socialLinks: boolean;
};

export type ClinicContent = {
  identity: ClinicIdentity;
  hero: ClinicHero;
  services: readonly ClinicService[];
  doctors: readonly ClinicDoctor[];
  testimonials: readonly ClinicTestimonial[];
  faq: readonly ClinicFaqEntry[];
  workingHours: readonly ClinicWorkingDay[];
  contact: ClinicContact;
  location: ClinicLocation;
  socialLinks: readonly ClinicSocialLink[];
  sectionVisibility: ClinicSectionVisibility;
};

export type ClinicTemplateProps = {
  clinic: ClinicContent;
};

export const CLINIC_TEMPLATE_SECTION_ORDER = [
  "hero",
  "about",
  "services",
  "doctors",
  "testimonials",
  "faq",
  "location-contact",
] as const;

export type ClinicTemplateSection = (typeof CLINIC_TEMPLATE_SECTION_ORDER)[number];
