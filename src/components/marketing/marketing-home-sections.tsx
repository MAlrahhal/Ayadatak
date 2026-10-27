import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getButtonClassName } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";

const benefits: { title: string; description: string; icon: IconName }[] = [
  { title: "عربي من البداية", description: "تجربة واضحة واتجاه RTL مناسب لمحتوى العيادات العربية.", icon: "language" },
  { title: "مرن على كل شاشة", description: "عرض مرتب على الهاتف والجهاز اللوحي وشاشة الحاسوب.", icon: "device" },
  { title: "محتوى عيادتك أولًا", description: "الخدمات والأطباء ومعلومات التواصل دون عناصر مشتتة.", icon: "edit" },
];

const steps: { number: string; title: string; description: string }[] = [
  { number: "١", title: "أضف بيانات العيادة", description: "الاسم والوصف ومعلومات التواصل." },
  { number: "٢", title: "رتّب المحتوى", description: "الخدمات والفريق الطبي والصور." },
  { number: "٣", title: "انشر الموقع", description: "صفحة واضحة يمكن مشاركتها مع الزوار." },
];

export function ConciseFeatures() {
  return (
    <section id="features" className="scroll-mt-20 bg-[#f8fcfd] py-14 sm:py-18">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-black text-primary">ما يهم عيادتك</p>
          <h2 className="mt-3 text-2xl font-black tracking-[-0.025em] text-[#08384b] sm:text-3xl">موقع واضح، بلا تعقيد</h2>
        </div>
        <ul className="mx-auto mt-9 grid max-w-5xl gap-px overflow-hidden rounded-2xl border border-cyan-100 bg-cyan-100 md:grid-cols-3">
          {benefits.map((benefit) => (
            <li key={benefit.title} className="flex gap-4 bg-white p-5 sm:p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#e8f8fc] text-primary"><Icon name={benefit.icon} className="size-5" /></span>
              <div><h3 className="font-black text-[#08384b]">{benefit.title}</h3><p className="mt-1.5 text-sm leading-6 text-[#5b7480]">{benefit.description}</p></div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function ConciseHowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-white py-14 sm:py-18">
      <Container>
        <div className="text-center"><p className="text-xs font-black text-primary">ثلاث خطوات</p><h2 className="mt-3 text-2xl font-black tracking-[-0.025em] text-[#08384b] sm:text-3xl">من بيانات العيادة إلى موقع جاهز</h2></div>
        <ol className="relative mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3 md:gap-8">
          <div className="absolute inset-x-[16%] top-6 hidden border-t border-dashed border-primary/35 md:block" aria-hidden="true" />
          {steps.map((step) => (
            <li key={step.number} className="relative flex items-center gap-4 rounded-xl border border-cyan-100 bg-white p-4 md:flex-col md:border-0 md:p-0 md:text-center">
              <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full bg-primary text-sm font-black text-white ring-8 ring-white">{step.number}</span>
              <div className="md:mt-3"><h3 className="font-black text-[#08384b]">{step.title}</h3><p className="mt-1 text-sm leading-6 text-[#5b7480]">{step.description}</p></div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function ConciseFinalCTA() {
  return (
    <section className="bg-white pb-16 sm:pb-20">
      <Container>
        <div className="relative overflow-hidden rounded-[26px] bg-[#08384b] px-6 py-10 text-center text-white sm:px-12 sm:py-12">
          <div className="pointer-events-none absolute -left-16 -top-20 size-64 rounded-full border-[46px] border-primary/20" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-2xl font-black tracking-[-0.025em] sm:text-3xl">شاهد كيف يمكن أن يبدو موقع عيادتك</h2>
            <p className="mt-3 text-sm leading-7 text-white/70">تصفح نموذجًا كاملًا لموقع عيادة على مختلف الأجهزة.</p>
            <div className="mt-6 flex justify-center"><Link href="/demo" className={getButtonClassName({ size: "lg", className: "min-w-52 bg-primary text-white hover:bg-[#078aaa]" })}>استعرض نموذج العيادة<Icon name="arrow-left" className="size-4" /></Link></div>
          </div>
        </div>
      </Container>
    </section>
  );
}
