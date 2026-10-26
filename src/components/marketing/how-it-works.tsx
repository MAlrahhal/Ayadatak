import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon, type IconName } from "@/components/ui/icon";

const steps: { number: string; title: string; description: string; icon: IconName }[] = [
  { number: "١", title: "ابدأ بالقالب الأساسي", description: "استخدم تصميمًا طبيًا متكاملًا ومهيأ لعرض محتوى عيادتك.", icon: "template" },
  { number: "٢", title: "أضف محتوى عيادتك", description: "أضف الخدمات والأطباء والصور ومعلومات التواصل.", icon: "file" },
  { number: "٣", title: "انشر موقعك", description: "احصل على رابط خاص بعيادتك، مع إمكانية ربط نطاق مخصص عند توفر الميزة.", icon: "check" },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-white py-12 sm:py-14">
      <Container>
        <div className="text-center">
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">ثلاث خطوات واضحة</span>
          <SectionHeading className="mx-auto mt-3 max-w-2xl" title="كيف تعمل المنصة؟" description="مسار مباشر يركز على محتوى عيادتك، من الإعداد إلى النشر." />
        </div>

        <ol className="relative mt-8 grid gap-4 md:grid-cols-3 md:gap-8">
          <div className="absolute right-[16.5%] left-[16.5%] top-8 hidden h-px bg-[linear-gradient(90deg,rgba(8,159,197,.18),rgba(8,159,197,.65),rgba(8,159,197,.18))] md:block" aria-hidden="true" />
          {steps.map((step, index) => (
            <li key={step.number} className="relative z-10 flex gap-4 rounded-2xl border border-cyan-100 bg-white p-4 md:flex-col md:items-center md:border-0 md:p-0 md:text-center">
              <div className="relative grid size-16 shrink-0 place-items-center rounded-full border border-cyan-100 bg-[#e7f8fc] text-primary shadow-[0_8px_24px_rgba(8,159,197,.1)] ring-[8px] ring-white">
                <Icon name={step.icon} className="size-6" />
                <span className="absolute -right-1 -top-1 grid size-6 place-items-center rounded-full bg-primary text-[10px] font-black text-white">{step.number}</span>
              </div>
              <div className="md:mt-2">
                <h3 className="text-base font-black text-[#08384b] sm:text-lg">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-[#5b7480]">{step.description}</p>
                {index === 2 && <p className="mt-1 text-[10px] font-bold text-primary">ربط النطاق المخصص: ميزة مستقبلية</p>}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
