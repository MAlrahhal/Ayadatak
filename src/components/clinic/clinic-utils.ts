import type {
  ClinicContent,
  ClinicDayOfWeek,
  ClinicImage,
  ClinicSocialPlatform,
  ClinicTemplateSection,
} from "@/types/clinic";
import { CLINIC_TEMPLATE_SECTION_ORDER } from "../../types/clinic";

export const clinicDayLabels: Record<ClinicDayOfWeek, string> = {
  saturday: "السبت",
  sunday: "الأحد",
  monday: "الاثنين",
  tuesday: "الثلاثاء",
  wednesday: "الأربعاء",
  thursday: "الخميس",
  friday: "الجمعة",
};

export const clinicSocialLabels: Record<ClinicSocialPlatform, string> = {
  facebook: "فيسبوك",
  instagram: "إنستغرام",
  x: "إكس",
  youtube: "يوتيوب",
  linkedin: "لينكدإن",
  tiktok: "تيك توك",
};

export type ClinicNavigationItem = {
  href: `#${string}`;
  label: string;
};

export function getRenderableClinicSections(clinic: ClinicContent): ClinicTemplateSection[] {
  return CLINIC_TEMPLATE_SECTION_ORDER.filter((section) => {
    switch (section) {
      case "hero":
        return true;
      case "about":
        return clinic.sectionVisibility.about && Boolean(clinic.identity.about.trim());
      case "services":
        return clinic.sectionVisibility.services && clinic.services.length > 0;
      case "doctors":
        return clinic.sectionVisibility.doctors && clinic.doctors.length > 0;
      case "testimonials":
        return clinic.sectionVisibility.testimonials && clinic.testimonials.length > 0;
      case "faq":
        return clinic.sectionVisibility.faq && clinic.faq.length > 0;
      case "location-contact":
        return hasClinicContactSection(clinic);
    }
  });
}

export function getClinicNavigation(clinic: ClinicContent): ClinicNavigationItem[] {
  const navigationBySection: Record<ClinicTemplateSection, ClinicNavigationItem> = {
    hero: { href: "#home", label: "الرئيسية" },
    about: { href: "#about", label: "عن العيادة" },
    services: { href: "#services", label: "الخدمات" },
    doctors: { href: "#doctors", label: "الأطباء" },
    testimonials: { href: "#testimonials", label: "آراء المراجعين" },
    faq: { href: "#faq", label: "الأسئلة الشائعة" },
    "location-contact": { href: "#contact", label: "الموقع والتواصل" },
  };

  return getRenderableClinicSections(clinic).map((section) => navigationBySection[section]);
}

export function hasClinicContactSection(clinic: ClinicContent): boolean {
  const visibility = clinic.sectionVisibility;
  return (
    (visibility.location && Boolean(clinic.location.address.trim())) ||
    (visibility.workingHours && clinic.workingHours.length > 0) ||
    (visibility.contact && Boolean(clinic.contact.phone.trim())) ||
    (visibility.socialLinks && clinic.socialLinks.length > 0)
  );
}

export function formatClinicTime(time: string): string {
  const [hourText, minuteText] = time.split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);

  if (!Number.isInteger(hour) || !Number.isInteger(minute)) {
    return time;
  }

  const period = hour >= 12 ? "م" : "ص";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${String(minute).padStart(2, "0")} ${period}`;
}

export function getSafeExternalUrl(value: string | undefined): string | null {
  if (!value) return null;

  try {
    const url = new URL(value);
    if ((url.protocol !== "https:" && url.protocol !== "http:") || url.username || url.password) {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
}

export function getPreviewSafeActionHref(href: string | null, previewMode: boolean): string | null {
  return previewMode ? null : href;
}

export function getRenderableImage(image: ClinicImage | undefined): ClinicImage | null {
  if (!image?.src.trim()) return null;
  if (image.src.startsWith("/")) return image;

  const url = getSafeExternalUrl(image.src);
  if (!url) return null;

  const hostname = new URL(url).hostname.toLowerCase();
  if (hostname === "example.com" || hostname.endsWith(".example.com")) return null;
  return { ...image, src: url };
}

export function getPhoneHref(phone: string): string | null {
  const normalized = phone.replace(/[^+\d]/g, "");
  return /^\+?\d{7,15}$/.test(normalized) ? `tel:${normalized}` : null;
}

export function getWhatsAppHref(phone: string | undefined): string | null {
  if (!phone) return null;
  const normalized = phone.replace(/\D/g, "");
  return /^\d{7,15}$/.test(normalized) ? `https://wa.me/${normalized}` : null;
}

export function getEmailHref(email: string | undefined): string | null {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return `mailto:${email}`;
}
