import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { ClinicSiteScreen } from "@/components/marketing/clinic-preview";

function FutureConcept({ side }: { side: "left" | "right" }) {
  if (side === "left") {
    return (
      <div className="absolute bottom-2 left-0 hidden h-[80%] w-[49%] -rotate-6 overflow-hidden rounded-[16px] border-[5px] border-white bg-[#0b3346] shadow-[0_22px_50px_rgba(4,70,94,.2)] sm:block" aria-label="تصور مستقبلي غير متاح لقالب داكن">
        <div className="flex h-7 items-center gap-1 border-b border-white/10 bg-[#082b3b] px-3" dir="ltr">
          <i className="size-1.5 rounded-full bg-white/25" /><i className="size-1.5 rounded-full bg-white/25" /><i className="size-1.5 rounded-full bg-white/25" />
        </div>
        <div className="grid h-[70%] grid-cols-[42%_58%]">
          <div className="flex flex-col justify-center p-5 text-white">
            <span className="mb-2 w-fit rounded-full bg-cyan-300/15 px-2 py-1 text-[6px] font-bold text-cyan-200">رعاية متخصصة</span>
            <p className="text-[13px] font-black leading-5">ثقة تبدأ<br />من التفاصيل</p>
            <p className="mt-2 text-[6px] leading-3 text-white/55">تصور بصري لهوية طبية جريئة وهادئة.</p>
            <span className="mt-3 w-fit rounded bg-cyan-400 px-3 py-1 text-[6px] font-bold text-[#08384b]">اعرف المزيد</span>
          </div>
          <div className="relative m-3 overflow-hidden rounded-xl">
            <Image src="/images/clinic-interior.png" alt="" fill sizes="180px" className="object-cover object-[62%_center] opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08384b]/65 to-transparent" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 px-4">
          {["الخبرة", "الرعاية", "التواصل"].map((item) => <div key={item} className="rounded-lg border border-white/10 bg-white/5 p-2 text-center text-[6px] font-bold text-white/70">{item}</div>)}
        </div>
        <span className="absolute bottom-2 left-2 rounded-full bg-white/12 px-2 py-1 text-[7px] font-bold text-white">تصور مستقبلي · غير متاح</span>
      </div>
    );
  }

  return (
    <div className="absolute bottom-2 right-0 hidden h-[80%] w-[49%] rotate-6 overflow-hidden rounded-[16px] border-[5px] border-white bg-[#f9fcfc] shadow-[0_22px_50px_rgba(4,70,94,.18)] sm:block" aria-label="تصور مستقبلي غير متاح لقالب بسيط">
      <div className="flex h-7 items-center gap-1 border-b border-slate-100 bg-slate-50 px-3" dir="ltr">
        <i className="size-1.5 rounded-full bg-slate-300" /><i className="size-1.5 rounded-full bg-slate-300" /><i className="size-1.5 rounded-full bg-slate-300" />
      </div>
      <div className="flex h-10 items-center justify-between px-4">
        <span className="text-[8px] font-black text-[#08384b]">مركز الصفاء الطبي</span>
        <div className="flex gap-2 text-[5px] font-bold text-slate-400"><span>عن المركز</span><span>التخصصات</span><span>تواصل</span></div>
      </div>
      <div className="grid h-[56%] grid-cols-[54%_46%] gap-2 px-3">
        <div className="relative overflow-hidden rounded-xl">
          <Image src="/images/clinic-interior.png" alt="" fill sizes="190px" className="object-cover object-[34%_center]" />
        </div>
        <div className="flex flex-col justify-center px-2">
          <span className="text-[6px] font-bold text-primary">صحتك بهدوء ووضوح</span>
          <p className="mt-1 text-[12px] font-black leading-5 text-[#08384b]">رعاية قريبة<br />في كل خطوة</p>
          <p className="mt-1 text-[5px] leading-3 text-slate-400">تصور بسيط يركز على الصورة والمعلومة.</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">
        {["عيادات عامة", "رعاية الأطفال", "الفحوصات"].map((item) => <div key={item} className="rounded-lg border border-cyan-100 bg-white p-2 text-center text-[6px] font-bold text-[#34566a] shadow-sm">{item}</div>)}
      </div>
      <span className="absolute bottom-2 left-2 rounded-full bg-slate-800/80 px-2 py-1 text-[7px] font-bold text-white">تصور مستقبلي · غير متاح</span>
    </div>
  );
}

export function TemplatePresentation() {
  return (
    <section id="templates" className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-[#effbfe] to-[#e9f8fb] py-16 sm:py-20 lg:py-24">
      <div className="absolute -right-20 bottom-0 size-72 rounded-full border-[55px] border-cyan-100/70" aria-hidden="true" />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-8">
          <div className="text-center lg:text-right">
            <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold text-primary shadow-sm">قالب احترافي للإطلاق</span>
            <h2 className="mt-4 text-3xl font-black leading-[1.35] tracking-[-0.025em] text-[#08384b] sm:text-4xl">
              تصميم جاهز يناسب<br className="hidden lg:block" /> عيادتك
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#4c6976] sm:text-base lg:mx-0">
              احصل على قالب طبي متكامل يعرض خدمات عيادتك وأطباءها ومعلومات التواصل بوضوح، مع إمكانية تخصيص المحتوى وهوية الألوان بسهولة. تصاميم إضافية مخطط لها لاحقًا.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
              {["الخدمات", "الأطباء", "الأسئلة الشائعة", "ساعات العمل", "التواصل"].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-cyan-100 bg-white/75 px-3 py-1.5 text-xs font-bold text-[#34566a]">
                  <Icon name="check" className="size-3.5 text-primary" />{item}
                </span>
              ))}
            </div>
            <div className="mt-6 inline-flex items-start gap-2 rounded-xl border border-cyan-200 bg-white/75 px-4 py-3 text-right text-xs leading-6 text-[#456371]">
              <Icon name="spark" className="mt-1 size-4 shrink-0 text-primary" />
              <span><strong className="text-[#08384b]">التصميم المعتمد:</strong> القالب الأساسي ظاهر في المنتصف، أما الواجهتان الخلفيتان فتصورات مستقبلية غير متاحة حاليًا.</span>
            </div>
          </div>

          <div role="img" aria-label="معاينة توضيحية للقالب الأساسي المعتمد، مع تصورين مستقبليين غير متاحين" className="relative mx-auto aspect-[1.45] w-full max-w-[760px]">
            <FutureConcept side="left" />
            <FutureConcept side="right" />
            <div className="absolute inset-x-[4%] bottom-0 z-10 h-[92%] overflow-hidden rounded-[18px] border-[6px] border-white bg-white shadow-[0_28px_70px_rgba(3,76,101,.25)] sm:inset-x-[18%]">
              <ClinicSiteScreen compact />
              <span className="absolute right-3 top-10 rounded-full bg-primary px-2.5 py-1 text-[8px] font-bold text-white shadow-md">القالب الأساسي</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
