import Image from "next/image";
import { Brand } from "@/components/ui/brand";
import { Icon } from "@/components/ui/icon";

const services = [
  { label: "طب الأسرة", icon: "heart" as const },
  { label: "الأسنان", icon: "tooth" as const },
  { label: "طب الأطفال", icon: "people" as const },
  { label: "الفحوصات", icon: "stethoscope" as const },
];

function BrowserBar({ address = "alnoor.ayadatak.com" }: { address?: string }) {
  return (
    <div className="flex h-8 items-center gap-2 border-b border-slate-200 bg-slate-50 px-3" dir="ltr">
      <div className="flex gap-1" aria-hidden="true">
        <i className="size-1.5 rounded-full bg-red-300" />
        <i className="size-1.5 rounded-full bg-amber-300" />
        <i className="size-1.5 rounded-full bg-emerald-300" />
      </div>
      <div className="mx-auto rounded-full border border-slate-200 bg-white px-4 py-0.5 text-[7px] text-slate-400">
        {address}
      </div>
    </div>
  );
}

export function ClinicSiteScreen({ compact = false }: { compact?: boolean }) {
  return (
    <div className="h-full bg-white text-right text-slate-800">
      <BrowserBar />
      <div className="flex h-11 items-center justify-between border-b border-slate-100 px-4">
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-lg bg-cyan-50 text-primary">
            <Icon name="spark" className="size-4" />
          </span>
          <div>
            <p className="text-[10px] font-black text-slate-800">عيادة النور</p>
            <p className="text-[6px] text-slate-400">لرعاية الأسرة</p>
          </div>
        </div>
        <div className="hidden items-center gap-3 text-[7px] font-semibold text-slate-500 sm:flex">
          <span className="text-primary">الرئيسية</span>
          <span>عن العيادة</span>
          <span>الخدمات</span>
          <span>الأطباء</span>
        </div>
        <span className="rounded-md bg-primary px-2 py-1 text-[7px] font-bold text-white">تواصل معنا</span>
      </div>

      <div className="relative h-[180px] overflow-hidden bg-[#eaf9fc] sm:h-[210px]">
        <Image
          src="/images/clinic-interior.png"
          alt="داخل عيادة طبية حديثة"
          fill
          sizes="(max-width: 768px) 88vw, 570px"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-white via-white/86 to-white/10" />
        <div className="absolute inset-y-0 right-0 flex w-[58%] flex-col justify-center px-5 sm:px-7">
          <span className="mb-2 w-fit rounded-full bg-primary/10 px-2 py-0.5 text-[7px] font-bold text-primary">رعاية طبية متكاملة</span>
          <h3 className="text-base font-black leading-[1.35] text-[#08384b] sm:text-xl">
            صحتك أولوية،<br />ورعايتك مسؤوليتنا
          </h3>
          {!compact && <p className="mt-2 max-w-[210px] text-[8px] leading-4 text-slate-500">فريق طبي متخصص يقدم رعاية هادئة وواضحة لكل أفراد الأسرة.</p>}
          <span className="mt-3 w-fit rounded-md bg-primary px-3 py-1.5 text-[8px] font-bold text-white">تواصل معنا</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 bg-[#f8fcfd] p-3 sm:p-4">
        {services.map((service) => (
          <div key={service.label} className="rounded-lg border border-cyan-100 bg-white px-1 py-2 text-center shadow-sm">
            <span className="mx-auto mb-1 grid size-6 place-items-center rounded-full bg-cyan-50 text-primary">
              <Icon name={service.icon} className="size-3.5" />
            </span>
            <p className="truncate text-[7px] font-bold text-[#08384b] sm:text-[8px]">{service.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[1.15fr_.85fr] gap-2 border-t border-cyan-50 bg-white px-3 pb-3 sm:gap-3 sm:px-4 sm:pb-4">
        <div className="flex items-center gap-2 rounded-lg border border-slate-100 bg-white p-2 shadow-sm">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#dff5fa] text-primary">
            <Icon name="stethoscope" className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="text-[6px] font-bold text-primary">الكادر الطبي</p>
            <p className="truncate text-[8px] font-black text-[#08384b]">د. سارة الخطيب</p>
            <p className="truncate text-[6px] text-slate-400">طب الأسرة والرعاية الأولية</p>
          </div>
        </div>
        <div className="rounded-lg bg-[#08384b] p-2 text-white shadow-sm">
          <p className="text-[6px] font-bold text-cyan-200">ساعات العمل</p>
          <div className="mt-1.5 flex items-center justify-between gap-2 text-[6px]">
            <span>السبت - الخميس</span><span className="font-bold">٩ ص - ٩ م</span>
          </div>
          {!compact && <p className="mt-1 border-t border-white/10 pt-1 text-[5px] text-white/55">عمّان، الأردن · اتصل بنا للوصول</p>}
        </div>
      </div>
    </div>
  );
}

function DashboardPreview() {
  const items = [
    ["dashboard", "نظرة عامة"],
    ["building", "بيانات العيادة"],
    ["clipboard", "الخدمات"],
    ["people", "الأطباء"],
    ["image", "صور الواجهة"],
    ["edit", "المحتوى"],
    ["settings", "الإعدادات"],
  ] as const;

  return (
    <div className="absolute left-[2%] top-[5%] h-[78%] w-[78%] -rotate-2 overflow-hidden rounded-[18px] border-[5px] border-white/80 bg-[#0b5270] shadow-[0_26px_70px_rgba(4,64,86,.25)] sm:left-[5%] sm:w-[75%]">
      <div className="flex h-full">
        <aside className="w-[29%] bg-[#074662] px-3 py-4 text-white">
          <Brand className="text-[10px] text-white [&>span]:size-6" />
          <div className="mt-5 space-y-1">
            {items.map(([icon, label], index) => (
              <div key={label} className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[7px] ${index === 1 ? "bg-primary text-white" : "text-cyan-50/75"}`}>
                <Icon name={icon} className="size-3" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </aside>
        <div className="flex-1 bg-[#f4fafc] p-3.5">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[10px] font-black text-[#08384b]">بيانات العيادة</p>
              <p className="mt-0.5 text-[6px] text-slate-400">حدّث المعلومات الظاهرة في موقعك</p>
            </div>
            <span className="rounded-md bg-primary px-2 py-1 text-[6px] font-bold text-white">حفظ التغييرات</span>
          </div>
          <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-[8px] font-black text-[#08384b]">هوية العيادة</span>
              <span className="flex items-center gap-1 text-[6px] font-bold text-emerald-600"><i className="size-1.5 rounded-full bg-emerald-500" />ظاهر في الموقع</span>
            </div>
            <div className="mt-2 grid grid-cols-[42px_1fr] gap-2">
              <div className="grid aspect-square place-items-center rounded-lg border border-dashed border-cyan-200 bg-cyan-50 text-primary">
                <Icon name="image" className="size-4" />
                <span className="-mt-2 text-[5px]">الشعار</span>
              </div>
              <div className="space-y-1.5">
                <label className="block">
                  <span className="mb-0.5 block text-[5px] font-bold text-slate-400">اسم العيادة</span>
                  <span className="block rounded border border-slate-200 bg-slate-50 px-2 py-1 text-[6px] text-slate-600">عيادة النور لرعاية الأسرة</span>
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <span className="rounded border border-slate-200 px-2 py-1 text-[5px] text-slate-500">عمّان، الأردن</span>
                  <span className="rounded border border-slate-200 px-2 py-1 text-[5px] text-slate-500">+٩٦٢ ٧ ٩٠٠٠ ٠٠٠٠</span>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <span className="mb-1 block text-[5px] font-bold text-slate-400">النبذة التعريفية</span>
              <div className="rounded-md border border-slate-200 bg-slate-50 p-2 text-[5px] leading-3 text-slate-500">رعاية طبية متكاملة للعائلة ضمن بيئة هادئة وفريق متخصص.</div>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {["٤ خدمات", "٣ أطباء", "٥ صور"].map((item) => (
                <span key={item} className="rounded-md bg-[#eff9fb] px-1 py-1.5 text-center text-[5px] font-bold text-primary">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhonePreview() {
  return (
    <div className="absolute bottom-[2%] left-0 z-30 h-[58%] w-[24%] min-w-[108px] overflow-hidden rounded-[22px] border-[5px] border-[#0b2433] bg-white shadow-[0_25px_55px_rgba(6,56,75,.25)] sm:left-[1%]">
      <div className="mx-auto h-3 w-12 rounded-b-lg bg-[#0b2433]" />
      <div className="flex items-center justify-between border-b border-slate-100 p-2">
        <Icon name="menu" className="size-3 text-slate-500" />
        <span className="text-[7px] font-black">عيادة النور</span>
      </div>
      <div className="relative h-[42%] overflow-hidden">
        <Image src="/images/clinic-interior.png" alt="" fill sizes="120px" className="object-cover" />
        <div className="absolute inset-0 bg-white/48" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-2 text-center">
          <p className="text-[9px] font-black leading-4 text-[#08384b]">رعاية متكاملة<br />لك ولعائلتك</p>
          <span className="mt-2 rounded bg-primary px-2 py-1 text-[6px] font-bold text-white">تواصل معنا</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1 p-2">
        {services.slice(0, 4).map((service) => (
          <div key={service.label} className="rounded border border-cyan-100 p-1 text-center">
            <Icon name={service.icon} className="mx-auto size-3 text-primary" />
            <p className="mt-0.5 text-[5px] font-bold">{service.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClinicPreview() {
  return (
    <div
      role="img"
      aria-label="معاينة توضيحية متكاملة للوحة إدارة عيادتك وموقع العيادة على الكمبيوتر والهاتف"
      className="relative mx-auto aspect-[1.12] w-full max-w-[690px] select-none"
    >
      <div className="absolute left-[4%] top-[8%] size-36 rounded-full bg-primary/15 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-[8%] right-[5%] size-44 rounded-full bg-cyan-200/30 blur-3xl" aria-hidden="true" />
      <DashboardPreview />
      <div className="absolute bottom-[5%] right-[2%] z-20 h-[77%] w-[83%] rotate-1 overflow-hidden rounded-[16px] border-[5px] border-white bg-white shadow-[0_28px_80px_rgba(5,78,105,.28)]">
        <ClinicSiteScreen />
      </div>
      <PhonePreview />
      <div className="absolute right-0 top-[1%] z-30 rounded-full border border-cyan-200 bg-white px-3 py-1.5 text-[9px] font-bold text-primary shadow-lg">
        معاينة توضيحية
      </div>
    </div>
  );
}
