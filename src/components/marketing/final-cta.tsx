import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getButtonClassName } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export function FinalCTA() {
  return (
    <section id="launch" className="scroll-mt-20 bg-white pb-20">
      <Container>
        <div className="relative overflow-hidden rounded-[30px] border border-cyan-200 bg-[#e9f9fc] shadow-[0_18px_55px_rgba(7,105,135,.12)]">
          <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full border-[48px] border-white/45" aria-hidden="true" />
          <div className="grid items-center lg:grid-cols-[1.05fr_.95fr]">
            <div className="relative z-10 px-6 py-10 text-center sm:px-10 sm:py-12 lg:px-14 lg:text-right">
              <span className="inline-flex rounded-full border border-white bg-white/80 px-3 py-1 text-xs font-bold text-primary shadow-sm">التسجيل العام قريبًا</span>
              <h2 className="mt-4 text-2xl font-black leading-[1.4] tracking-[-0.025em] text-[#08384b] sm:text-4xl">استكشف موقع عيادتك القادم</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#4c6976] sm:text-base lg:mx-0">
              شاهد القالب وتعرّف على الخطوات التي ستساعدك على بناء حضور رقمي يليق بعيادتك بكل سهولة.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Link href="#templates" className={getButtonClassName({ size: "lg", className: "sm:px-8" })}>
                  استكشف القالب
                  <Icon name="arrow-left" className="size-4" />
                </Link>
                <Link href="#how-it-works" className={getButtonClassName({ variant: "secondary", size: "lg" })}>
                  <Icon name="play" className="size-4 text-primary" />
                  شاهد كيف تعمل
                </Link>
              </div>
              <p className="mt-4 text-[11px] font-semibold text-[#63808c]">سيتاح إنشاء الحسابات عند إطلاق المنصة.</p>
            </div>

            <div className="relative min-h-[290px] overflow-hidden border-t border-cyan-200 lg:min-h-[360px] lg:border-r lg:border-t-0">
              <Image src="/images/clinic-interior.png" alt="مساحة استقبال عيادة حديثة" fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08384b]/35 via-transparent to-white/5 lg:bg-gradient-to-r lg:from-transparent lg:to-[#e9f9fc]/25" />
              <div className="absolute bottom-6 right-6 left-12 overflow-hidden rounded-xl border border-white/80 bg-white/92 p-3 shadow-[0_18px_45px_rgba(8,56,75,.22)] backdrop-blur-sm sm:left-24 lg:left-8">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2"><span className="grid size-7 place-items-center rounded-lg bg-primary/10 text-primary"><Icon name="spark" className="size-4" /></span><span className="text-[10px] font-black text-[#08384b]">عيادة النور</span></div>
                  <span className="rounded bg-primary px-2 py-1 text-[7px] font-bold text-white">موقع العيادة</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {["الخدمات", "الأطباء", "معلومات التواصل"].map((item) => <span key={item} className="rounded-lg bg-[#eef9fb] px-2 py-2 text-center text-[7px] font-bold text-[#34566a]">{item}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
