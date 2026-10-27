import type { ClinicContent } from "@/types/clinic";

const demoImageBaseUrl = "https://example.com/ayadatak-demo-assets";

export const demoClinic = {
  identity: {
    id: "clinic_demo_alnoor",
    slug: "demo",
    nameAr: "عيادة النور",
    tagline: "رعاية صحية قريبة من عائلتك",
    about:
      "عيادة تجريبية توضيحية تعرض شكل المحتوى الذي يمكن لصاحب العيادة إدارته عبر منصة عيادتك. جميع الأسماء وبيانات التواصل الواردة هنا وهمية.",
    logo: {
      src: `${demoImageBaseUrl}/logo.png`,
      alt: "شعار تجريبي لعيادة النور",
    },
    brandColors: {
      primary: "#087F9C",
      accent: "#D8F3F7",
    },
  },
  hero: {
    headline: "رعاية طبية واضحة وهادئة لكل أفراد الأسرة",
    description:
      "فريق طبي تجريبي متعدد التخصصات يقدم الاستشارات والفحوصات الأساسية ضمن بيئة مريحة.",
    slides: [
      {
        id: "hero-reception",
        image: {
          src: `${demoImageBaseUrl}/clinic-reception.jpg`,
          alt: "صورة توضيحية لاستقبال عيادة حديثة",
        },
      },
      {
        id: "hero-consultation-room",
        image: {
          src: `${demoImageBaseUrl}/consultation-room.jpg`,
          alt: "صورة توضيحية لغرفة استشارة طبية",
        },
      },
      {
        id: "hero-care-team",
        image: {
          src: `${demoImageBaseUrl}/care-team.jpg`,
          alt: "صورة توضيحية لفريق رعاية صحية",
        },
      },
    ],
  },
  services: [
    {
      id: "service-family-medicine",
      name: "طب الأسرة",
      description: "متابعة صحية عامة وخطط رعاية مناسبة لمختلف أفراد الأسرة.",
      icon: "family-medicine",
      displayOrder: 1,
    },
    {
      id: "service-pediatrics",
      name: "طب الأطفال",
      description: "متابعة نمو الأطفال والاستشارات الصحية الدورية.",
      icon: "pediatrics",
      displayOrder: 2,
    },
    {
      id: "service-general-checkups",
      name: "الفحوصات العامة",
      description: "تقييمات صحية أولية ومتابعة المؤشرات الأساسية.",
      icon: "general-checkups",
      displayOrder: 3,
    },
    {
      id: "service-nutrition",
      name: "التغذية العلاجية",
      description: "إرشاد غذائي مبني على احتياجات المراجع وأهدافه الصحية.",
      icon: "nutrition",
      displayOrder: 4,
    },
  ],
  doctors: [
    {
      id: "doctor-lina-haddad",
      name: "د. لينا الحداد",
      specialty: "طب الأسرة",
      biography: "طبيبة تجريبية مهتمة بالرعاية الوقائية والمتابعة الصحية طويلة المدى.",
      yearsOfExperience: 9,
      image: {
        src: `${demoImageBaseUrl}/doctor-lina.jpg`,
        alt: "صورة توضيحية للدكتورة لينا الحداد",
      },
      displayOrder: 1,
    },
    {
      id: "doctor-omar-nasser",
      name: "د. عمر ناصر",
      specialty: "طب الأطفال",
      biography: "طبيب تجريبي يقدم متابعة صحية للأطفال وتثقيفًا مبسطًا للعائلات.",
      yearsOfExperience: 7,
      image: {
        src: `${demoImageBaseUrl}/doctor-omar.jpg`,
        alt: "صورة توضيحية للدكتور عمر ناصر",
      },
      displayOrder: 2,
    },
    {
      id: "doctor-rana-salem",
      name: "د. رنا سالم",
      specialty: "التغذية العلاجية",
      biography: "اختصاصية تجريبية تركز على بناء عادات غذائية عملية ومستدامة.",
      yearsOfExperience: 6,
      image: {
        src: `${demoImageBaseUrl}/doctor-rana.jpg`,
        alt: "صورة توضيحية للدكتورة رنا سالم",
      },
      displayOrder: 3,
    },
  ],
  testimonials: [],
  faq: [
    {
      id: "faq-services",
      question: "ما الخدمات المتوفرة في العيادة؟",
      answer: "تعرض هذه النسخة التجريبية خدمات طب الأسرة والأطفال والفحوصات العامة والتغذية.",
      displayOrder: 1,
    },
    {
      id: "faq-contact",
      question: "كيف يمكنني التواصل مع العيادة؟",
      answer: "يمكن استخدام رقم الهاتف أو البريد الإلكتروني التجريبي الظاهر في قسم التواصل.",
      displayOrder: 2,
    },
    {
      id: "faq-hours",
      question: "ما ساعات العمل؟",
      answer: "تظهر ساعات العمل المحدثة لكل يوم في أسفل الموقع التجريبي.",
      displayOrder: 3,
    },
    {
      id: "faq-location",
      question: "أين تقع العيادة؟",
      answer: "العنوان المعروض تجريبي وغير مرتبط بعيادة حقيقية، ويمكن فتح رابط الخريطة التوضيحي.",
      displayOrder: 4,
    },
    {
      id: "faq-demo",
      question: "هل عيادة النور عميل حقيقي لمنصة عيادتك؟",
      answer: "لا. عيادة النور وبياناتها محتوى تجريبي صُمم لشرح بنية الموقع فقط.",
      displayOrder: 5,
    },
  ],
  workingHours: [
    {
      day: "saturday",
      isOpen: true,
      periods: [{ opensAt: "09:00", closesAt: "17:00" }],
    },
    {
      day: "sunday",
      isOpen: true,
      periods: [{ opensAt: "09:00", closesAt: "17:00" }],
    },
    {
      day: "monday",
      isOpen: true,
      periods: [{ opensAt: "09:00", closesAt: "17:00" }],
    },
    {
      day: "tuesday",
      isOpen: true,
      periods: [{ opensAt: "09:00", closesAt: "17:00" }],
    },
    {
      day: "wednesday",
      isOpen: true,
      periods: [
        { opensAt: "09:00", closesAt: "13:00" },
        { opensAt: "15:00", closesAt: "19:00" },
      ],
    },
    {
      day: "thursday",
      isOpen: true,
      periods: [{ opensAt: "09:00", closesAt: "15:00" }],
    },
    { day: "friday", isOpen: false, periods: [] },
  ],
  contact: {
    phone: "+962 00 000 0000",
    whatsapp: "+962 00 000 0000",
    email: "demo-clinic@example.com",
  },
  location: {
    address: "عنوان تجريبي — عمّان، الأردن",
    mapUrl: "https://example.com/ayadatak-demo-map",
  },
  socialLinks: [
    {
      platform: "instagram",
      url: "https://example.com/ayadatak-demo-instagram",
    },
    {
      platform: "facebook",
      url: "https://example.com/ayadatak-demo-facebook",
    },
  ],
  sectionVisibility: {
    about: true,
    services: true,
    doctors: true,
    testimonials: false,
    faq: true,
    location: true,
    workingHours: true,
    contact: true,
    socialLinks: true,
  },
} satisfies ClinicContent;
