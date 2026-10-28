import type { ClinicContent } from "@/types/clinic";

const demoImageBaseUrl = "/images/clinic-demo";

export const sakeenaDemoClinic = {
  identity: {
    id: "clinic_demo_sakeena",
    slug: "sakeena-demo",
    nameAr: "عيادة السكينة التجريبية",
    tagline: "عناية فموية هادئة وواضحة",
    about:
      "عيادة خيالية أُنشئت لاختبار استقلال بيانات المواقع التجريبية في منصة عيادتك. جميع الأسماء وبيانات التواصل المعروضة غير حقيقية.",
    brandColors: {
      primary: "#2563EB",
      accent: "#DBEAFE",
    },
  },
  hero: {
    headline: "ابتسامة صحية تبدأ برعاية بسيطة ومفهومة",
    description:
      "محتوى تجريبي يوضح عرض خدمات الأسنان وفريق العيادة وساعات العمل دون الاعتماد على بيانات عيادة حقيقية.",
    slides: [
      {
        id: "sakeena-hero-room",
        image: {
          src: "/images/clinic-interior.png",
          alt: "صورة توضيحية خيالية لغرفة عناية بالأسنان",
        },
      },
      {
        id: "sakeena-hero-reception",
        image: {
          src: `${demoImageBaseUrl}/clinic-corridor.webp`,
          alt: "صورة توضيحية خيالية لاستقبال عيادة",
        },
      },
    ],
  },
  services: [
    {
      id: "service-preventive-dentistry",
      name: "العناية الوقائية",
      description: "فحوصات دورية وإرشادات مبسطة للمحافظة على صحة الفم.",
      displayOrder: 1,
    },
    {
      id: "service-dental-cleaning",
      name: "تنظيف الأسنان",
      displayOrder: 2,
    },
  ],
  doctors: [
    {
      id: "doctor-salma-demo",
      name: "د. سلمى التجريبية",
      specialty: "طب الأسنان العام",
      displayOrder: 1,
    },
  ],
  testimonials: [],
  faq: [],
  workingHours: [
    {
      day: "saturday",
      isOpen: true,
      periods: [{ opensAt: "10:00", closesAt: "16:00" }],
    },
    {
      day: "sunday",
      isOpen: true,
      periods: [
        { opensAt: "09:00", closesAt: "13:00" },
        { opensAt: "16:00", closesAt: "20:00" },
      ],
    },
    {
      day: "monday",
      isOpen: false,
      periods: [],
    },
    {
      day: "tuesday",
      isOpen: true,
      periods: [{ opensAt: "10:00", closesAt: "18:00" }],
    },
    {
      day: "wednesday",
      isOpen: true,
      periods: [{ opensAt: "10:00", closesAt: "18:00" }],
    },
    {
      day: "thursday",
      isOpen: true,
      periods: [{ opensAt: "10:00", closesAt: "15:00" }],
    },
    {
      day: "friday",
      isOpen: false,
      periods: [],
    },
  ],
  contact: {
    phone: "+962 00 000 1111",
  },
  location: {
    address: "عنوان تجريبي ثانٍ — عمّان، الأردن",
  },
  socialLinks: [],
  sectionVisibility: {
    about: true,
    services: true,
    doctors: true,
    testimonials: true,
    faq: false,
    location: true,
    workingHours: true,
    contact: true,
    socialLinks: false,
  },
} satisfies ClinicContent;
