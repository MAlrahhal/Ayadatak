import Image from "next/image";
import { Icon, type IconName } from "@/components/ui/icon";

const services: { label: string; note: string; icon: IconName }[] = [
  { label: "طب الأسرة", note: "رعاية صحية متكاملة", icon: "heart" },
  { label: "طب الأطفال", note: "متابعة النمو والصحة", icon: "people" },
  { label: "الفحوصات الدورية", note: "متابعة ووقاية", icon: "stethoscope" },
];

function ClinicMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`${compact ? "size-7" : "size-9"} grid place-items-center rounded-xl bg-primary text-white shadow-sm`}>
        <Icon name="spark" className={compact ? "size-3.5" : "size-4.5"} />
      </span>
      <div>
        <p className={`${compact ? "text-[8px]" : "text-[11px]"} font-black text-[#08384b]`}>عيادة النور</p>
        <p className={`${compact ? "text-[5px]" : "text-[7px]"} text-slate-400`}>لرعاية الأسرة</p>
      </div>
    </div>
  );
}

function DesktopClinicPreview() {
  return (
    <div className="relative min-w-0 pb-3 sm:pb-4">
      <div className="overflow-hidden rounded-[18px] border-[5px] border-white bg-white shadow-[0_28px_70px_rgba(8,56,75,.2)] ring-1 ring-[#0b5c73]/10">
        <div className="flex h-7 items-center gap-1.5 border-b border-slate-200 bg-[#f6fafb] px-3" dir="ltr">
          <span className="size-1.5 rounded-full bg-[#ff8f86]" />
          <span className="size-1.5 rounded-full bg-[#ffd273]" />
          <span className="size-1.5 rounded-full bg-[#6dd8a2]" />
          <span className="mx-auto rounded-full border border-slate-200 bg-white px-8 py-0.5 text-[5px] text-slate-400">alnoor.ayadatak.com</span>
        </div>
        <div className="flex h-12 items-center justify-between border-b border-slate-100 px-4">
          <ClinicMark />
          <div className="hidden items-center gap-4 text-[7px] font-bold text-slate-500 min-[470px]:flex lg:hidden">
            <span className="text-primary">الرئيسية</span><span>خدماتنا</span><span>الفريق الطبي</span><span>عن العيادة</span>
          </div>
          <span className="rounded-lg border border-primary/20 px-3 py-1.5 text-[7px] font-black text-primary">تواصل معنا</span>
        </div>
        <div className="grid min-h-[190px] grid-cols-[53%_47%] bg-[#eaf8fb] sm:min-h-[240px]">
          <div className="flex flex-col justify-center px-4 py-5 sm:px-7 lg:px-4">
            <span className="w-fit rounded-full bg-white px-2.5 py-1 text-[6px] font-black text-primary shadow-sm sm:text-[7px]">رعاية قريبة من عائلتك</span>
            <h3 className="mt-3 text-[16px] font-black leading-[1.45] tracking-[-0.025em] text-[#08384b] sm:text-[22px] lg:text-[16px] xl:text-[18px]">صحتك أولوية،<br />ورعايتك مسؤوليتنا</h3>
            <p className="mt-2 max-w-[290px] text-[7px] leading-4 text-[#55717e] sm:text-[9px] sm:leading-[18px]">رعاية طبية واضحة لكل أفراد الأسرة، يقدمها فريق متخصص في بيئة مريحة.</p>
            <div className="mt-3 flex items-center gap-3 text-[6px] font-bold sm:text-[7px]">
              <span className="rounded-lg bg-primary px-3 py-1.5 text-white">اعرف خدماتنا</span><span className="text-[#52707c]">السبت — الخميس</span>
            </div>
          </div>
          <div className="relative overflow-hidden">
            <Image src="/images/clinic-interior.png" alt="داخل عيادة النور الحديثة" fill sizes="(max-width: 768px) 45vw, 480px" className="object-cover object-center" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#eaf8fb]/80" />
          </div>
        </div>
        <div className="grid gap-2 p-3 min-[470px]:grid-cols-[1fr_31%] sm:p-4">
          <div>
            <div className="mb-2 flex items-center justify-between"><p className="text-[8px] font-black text-[#08384b] sm:text-[10px]">خدماتنا الطبية</p><span className="text-[6px] font-bold text-primary sm:text-[7px]">جميع الخدمات</span></div>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {services.map((service) => (
                <div key={service.label} className="rounded-xl border border-cyan-100 bg-white p-2 shadow-sm">
                  <span className="grid size-6 place-items-center rounded-lg bg-primary/10 text-primary sm:size-7"><Icon name={service.icon} className="size-3 sm:size-3.5" /></span>
                  <p className="mt-2 truncate text-[6px] font-black text-[#08384b] sm:text-[8px]">{service.label}</p>
                  <p className="mt-0.5 hidden truncate text-[5px] text-slate-400 min-[470px]:block sm:text-[6px]">{service.note}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden rounded-xl bg-[#08384b] p-3 text-white min-[470px]:block">
            <p className="text-[6px] font-bold text-cyan-200 sm:text-[7px]">الفريق الطبي</p>
            <div className="mt-2 flex items-center gap-2"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/10"><Icon name="stethoscope" className="size-3.5" /></span><div><p className="text-[7px] font-black sm:text-[8px]">د. سارة الخطيب</p><p className="text-[5px] text-white/55 sm:text-[6px]">طب الأسرة</p></div></div>
            <p className="mt-3 border-t border-white/10 pt-2 text-[5px] text-white/60 sm:text-[6px]">عمّان · من ٩ ص إلى ٩ م</p>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-[12%] bottom-0 h-3 rounded-b-[18px] bg-gradient-to-b from-[#d8e6e9] to-[#aebfc4] shadow-[0_8px_14px_rgba(8,56,75,.14)] sm:h-4" aria-hidden="true" />
    </div>
  );
}

function MobileClinicPreview() {
  return (
    <div className="mx-auto w-[178px] overflow-hidden rounded-[28px] border-[6px] border-[#082f40] bg-white shadow-[0_26px_65px_rgba(8,56,75,.24)] sm:w-full sm:max-w-[205px] lg:w-[148px]">
      <div className="mx-auto h-3 w-16 rounded-b-xl bg-[#082f40]" />
      <div className="flex h-10 items-center justify-between border-b border-slate-100 px-3"><ClinicMark compact /><Icon name="menu" className="size-3.5 text-[#08384b]" /></div>
      <div className="relative h-[170px] overflow-hidden sm:h-[205px]">
        <Image src="/images/clinic-interior.png" alt="موقع عيادة النور على الهاتف" fill sizes="205px" className="object-cover object-center" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#062f42]/90 via-[#062f42]/20 to-transparent" />
        <div className="absolute inset-x-3 bottom-4 text-white"><span className="rounded-full bg-white/15 px-2 py-1 text-[6px] font-bold backdrop-blur">رعاية لكل العائلة</span><p className="mt-2 text-[15px] font-black leading-[1.4]">صحتك أولوية،<br />ورعايتك مسؤوليتنا</p></div>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between"><p className="text-[8px] font-black text-[#08384b]">خدماتنا</p><span className="text-[6px] font-bold text-primary">عرض الكل</span></div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {services.slice(0, 2).map((service) => <div key={service.label} className="rounded-xl bg-[#eff9fb] p-2.5"><Icon name={service.icon} className="size-4 text-primary" /><p className="mt-1.5 text-[7px] font-black text-[#08384b]">{service.label}</p></div>)}
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-100 p-2"><span className="grid size-7 place-items-center rounded-full bg-primary/10 text-primary"><Icon name="stethoscope" className="size-3.5" /></span><div><p className="text-[7px] font-black text-[#08384b]">د. سارة الخطيب</p><p className="text-[6px] text-slate-400">طب الأسرة</p></div></div>
      </div>
    </div>
  );
}

export function PublicClinicShowcase() {
  return (
    <div role="img" aria-label="موقع عيادة النور نفسه على جهاز حاسوب وهاتف" className="relative mx-auto grid max-w-[1040px] items-end gap-6 select-none sm:grid-cols-[minmax(0,1fr)_190px] sm:gap-4 lg:grid-cols-[minmax(0,1fr)_148px] lg:gap-3">
      <div className="pointer-events-none absolute -left-10 top-14 size-52 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
      <div className="relative"><DesktopClinicPreview /></div>
      <div className="relative sm:pb-4"><MobileClinicPreview /></div>
    </div>
  );
}
