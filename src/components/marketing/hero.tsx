import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getButtonClassName } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { HeroProductShowcase } from "@/components/marketing/hero-product-showcase";

const benefits = [
  { icon: "spark" as const, title: "إعداد واضح", text: "خطوات بسيطة" },
  { icon: "device" as const, title: "متجاوب", text: "مع جميع الأجهزة" },
  { icon: "settings" as const, title: "تحكم كامل", text: "بالمحتوى المدعوم" },
];

export function Hero() {
  return (
    <section id="top" className="relative scroll-mt-20 overflow-hidden bg-[#f4fbfd] pb-10 pt-10 sm:pb-14 sm:pt-14 lg:pb-16 lg:pt-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_94%_20%,rgba(188,236,245,.58),transparent_27%),radial-gradient(circle_at_8%_78%,rgba(8,159,197,.09),transparent_30%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-28 top-20 size-72 rounded-full border-[54px] border-cyan-100/55" aria-hidden="true" />
      <Container className="relative">
        <div className="grid items-center gap-8 lg:grid-cols-[.74fr_1.26fr] lg:gap-3 xl:gap-6">
          <div className="relative z-10 min-w-0 text-center lg:text-right">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/90 px-3 py-1.5 text-xs font-bold text-primary shadow-sm">
              <i className="size-1.5 rounded-full bg-primary" />
              منصة بناء مواقع العيادات
            </span>
            <h1 className="mx-auto mt-5 max-w-[560px] text-[2.05rem] font-black leading-[1.4] tracking-[-0.035em] text-[#08384b] min-[460px]:text-[2.3rem] sm:text-[2.55rem] lg:mx-0 lg:text-[2.55rem] xl:text-[2.65rem]">
              <span className="block">موقع عيادتك..</span>
              <span className="block text-primary">بكل سهولة، ومن مكان واحد</span>
            </h1>
            <p className="mx-auto mt-4 max-w-[520px] text-sm leading-7 text-[#4c6976] sm:text-[15px] sm:leading-8 lg:mx-0">
              أنشئ موقعًا احترافيًا لعيادتك، واعرض خدماتك وأطباءك ومعلومات التواصل، ثم تحكّم بمحتوى الموقع من لوحة إدارة عربية سهلة، دون الحاجة إلى خبرة تقنية.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row lg:flex-col lg:items-stretch xl:flex-row xl:items-center xl:justify-start">
              <Link href="#templates" className={getButtonClassName({ size: "lg", className: "lg:w-full xl:w-auto" })}>
                استكشف القالب
                <Icon name="arrow-left" className="size-4" />
              </Link>
              <Link href="#how-it-works" className={getButtonClassName({ variant: "secondary", size: "lg", className: "lg:w-full xl:w-auto" })}>
                <Icon name="play" className="size-4 text-primary" />
                شاهد كيف تعمل
              </Link>
            </div>
            <div className="mt-7 grid grid-cols-3 gap-2 border-t border-cyan-100 pt-4">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex flex-col items-center gap-2 sm:flex-row sm:text-right lg:items-start">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-primary shadow-sm ring-1 ring-cyan-100">
                    <Icon name={benefit.icon} className="size-4.5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-black text-[#08384b] sm:text-xs">{benefit.title}</p>
                    <p className="mt-0.5 text-[9px] text-slate-500 sm:text-[10px]">{benefit.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative -mx-3 sm:mx-0 xl:-me-7">
            <HeroProductShowcase />
          </div>
        </div>
      </Container>
    </section>
  );
}
