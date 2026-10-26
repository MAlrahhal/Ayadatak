import Image from "next/image";
import { Icon, type IconName } from "@/components/ui/icon";

const dashboardNav: { label: string; icon: IconName; active?: boolean }[] = [
  { label: "نظرة عامة", icon: "dashboard" },
  { label: "بيانات العيادة", icon: "building", active: true },
  { label: "الخدمات", icon: "clipboard" },
  { label: "الأطباء", icon: "people" },
  { label: "صور الواجهة", icon: "image" },
  { label: "معلومات التواصل", icon: "globe" },
];

const clinicServices: { label: string; note: string; icon: IconName }[] = [
  { label: "طب الأسرة", note: "رعاية شاملة", icon: "heart" },
  { label: "طب الأطفال", note: "متابعة النمو", icon: "people" },
  { label: "الفحوصات", note: "متابعة دورية", icon: "stethoscope" },
];

function MiniBrand({ inverted = false }: { inverted?: boolean }) {
  return (
    <div className={`flex items-center gap-1.5 font-black ${inverted ? "text-white" : "text-[#08384b]"}`}>
      <span className="grid size-6 place-items-center rounded-lg bg-primary text-white shadow-sm">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden="true">
          <path d="M5 13c2.8 3.5 7 4.5 10.5 2.1 1.3-1 2.2-2.3 2.8-3.9M6 8h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </span>
      <span className="text-[9px]">عيادتك</span>
    </div>
  );
}

function DashboardShell() {
  return (
    <div className="absolute inset-x-[1%] top-0 z-0 h-[72%] overflow-hidden rounded-[22px] border border-white/80 bg-white shadow-[0_28px_70px_rgba(8,56,75,.18)] sm:inset-x-[3%]">
      <div className="flex h-full">
        <aside className="w-[25%] shrink-0 bg-[#08384b] px-2.5 py-3 text-white sm:px-3.5 sm:py-4">
          <MiniBrand inverted />
          <div className="mt-4 rounded-lg border border-white/10 bg-white/5 px-2 py-2">
            <p className="text-[5px] text-white/50">مساحة العمل</p>
            <p className="mt-0.5 truncate text-[7px] font-bold">عيادة النور</p>
          </div>
          <nav aria-label="أقسام إدارة موقع العيادة" className="mt-3 space-y-1">
            {dashboardNav.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[6px] font-semibold sm:text-[7px] ${item.active ? "bg-primary text-white shadow-[0_7px_18px_rgba(8,159,197,.22)]" : "text-white/58"}`}
              >
                <Icon name={item.icon} className="size-2.5 shrink-0 sm:size-3" />
                <span className="truncate">{item.label}</span>
              </div>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1 bg-[#f5fafb] p-2.5 sm:p-4">
          <header className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-[8px] font-black text-[#08384b] sm:text-[10px]">بيانات العيادة</p>
                <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[5px] font-bold text-emerald-700">منشور</span>
              </div>
              <p className="mt-0.5 text-[5px] text-slate-400 sm:text-[6px]">المعلومات الأساسية التي تظهر في موقعك</p>
            </div>
            <div className="flex gap-1.5">
              <span className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[5px] font-bold text-slate-500">معاينة</span>
              <span className="rounded-md bg-primary px-2 py-1 text-[5px] font-bold text-white">حفظ</span>
            </div>
          </header>

          <div className="mt-2.5 grid grid-cols-[1fr_34%] gap-2.5">
            <section className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary"><Icon name="building" className="size-4" /></span>
                <div><p className="text-[7px] font-black text-[#08384b]">هوية العيادة</p><p className="text-[5px] text-slate-400">الاسم والوصف والشعار</p></div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                <label className="block">
                  <span className="mb-0.5 block text-[5px] font-bold text-slate-400">اسم العيادة</span>
                  <span className="block rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-[6px] text-slate-600">عيادة النور لرعاية الأسرة</span>
                </label>
                <label className="block">
                  <span className="mb-0.5 block text-[5px] font-bold text-slate-400">التخصص الرئيسي</span>
                  <span className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-[6px] text-slate-600">طب الأسرة <Icon name="chevron-down" className="size-2" /></span>
                </label>
              </div>
              <label className="mt-1.5 block">
                <span className="mb-0.5 block text-[5px] font-bold text-slate-400">نبذة قصيرة</span>
                <span className="block rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-[5px] leading-[10px] text-slate-500">نقدم رعاية طبية متكاملة لكل أفراد الأسرة ضمن بيئة مريحة وفريق متخصص.</span>
              </label>
              <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                <span className="rounded-md border border-slate-200 px-2 py-1.5 text-[5px] text-slate-500">عمّان، الأردن</span>
                <span className="rounded-md border border-slate-200 px-2 py-1.5 text-[5px] text-slate-500" dir="ltr">+962 7 9000 0000</span>
              </div>
            </section>

            <div className="space-y-2">
              <section className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
                <div className="flex items-center justify-between"><span className="text-[6px] font-black text-[#08384b]">الشعار</span><Icon name="edit" className="size-2.5 text-primary" /></div>
                <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-dashed border-cyan-200 bg-cyan-50/60 p-2">
                  <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-white text-primary shadow-sm"><Icon name="spark" className="size-3.5" /></span>
                  <span className="text-[5px] leading-3 text-slate-500">صورة مربعة<br />PNG أو JPG</span>
                </div>
              </section>
              <section className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
                <p className="text-[6px] font-black text-[#08384b]">الأقسام الظاهرة</p>
                <div className="mt-1.5 space-y-1">
                  {["الخدمات", "الأطباء", "التواصل"].map((item) => (
                    <div key={item} className="flex items-center justify-between text-[5px] text-slate-500">
                      <span>{item}</span><span className="relative h-3 w-6 rounded-full bg-primary"><i className="absolute left-0.5 top-0.5 size-2 rounded-full bg-white" /></span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopClinicSite() {
  return (
    <div className="absolute bottom-[2%] left-0 z-20 h-[63%] w-[79%] overflow-hidden rounded-[18px] border-[5px] border-white bg-white shadow-[0_32px_82px_rgba(8,56,75,.26)] sm:left-[1%]">
      <div className="flex h-6 items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-2.5" dir="ltr">
        <span className="size-1.5 rounded-full bg-red-300" /><span className="size-1.5 rounded-full bg-amber-300" /><span className="size-1.5 rounded-full bg-emerald-300" />
        <span className="mx-auto rounded-full border border-slate-200 bg-white px-8 py-0.5 text-[5px] text-slate-400">alnoor.ayadatak.com</span>
      </div>
      <div className="flex h-9 items-center justify-between border-b border-slate-100 px-3">
        <div className="flex items-center gap-1.5"><span className="grid size-5 place-items-center rounded-md bg-primary/10 text-primary"><Icon name="spark" className="size-3" /></span><div><p className="text-[7px] font-black text-[#08384b]">عيادة النور</p><p className="text-[4px] text-slate-400">لرعاية الأسرة</p></div></div>
        <nav aria-label="معاينة تنقل موقع العيادة" className="flex gap-2 text-[5px] font-bold text-slate-400"><span className="text-primary">الرئيسية</span><span>الخدمات</span><span>الأطباء</span><span>عن العيادة</span></nav>
        <span className="rounded bg-primary px-2 py-1 text-[5px] font-bold text-white">تواصل معنا</span>
      </div>

      <div className="grid h-[43%] grid-cols-[52%_48%] overflow-hidden bg-[#ecf9fc]">
        <div className="flex flex-col justify-center px-4">
          <span className="mb-1 w-fit rounded-full bg-white px-2 py-0.5 text-[5px] font-bold text-primary shadow-sm">رعاية صحية لكل العائلة</span>
          <h3 className="text-[12px] font-black leading-[1.45] text-[#08384b] sm:text-[15px]">صحتك أولوية،<br />ورعايتك مسؤوليتنا</h3>
          <p className="mt-1 max-w-[190px] text-[5px] leading-[10px] text-slate-500 sm:text-[6px]">خدمات طبية واضحة، وفريق متخصص، ومعلومات التواصل في مكان واحد.</p>
          <div className="mt-2 flex items-center gap-1.5"><span className="rounded bg-primary px-2.5 py-1 text-[5px] font-bold text-white">تواصل معنا</span><span className="text-[5px] font-bold text-[#52707c]">السبت - الخميس</span></div>
        </div>
        <div className="relative">
          <Image src="/images/clinic-interior.png" alt="داخل عيادة طبية حديثة" fill sizes="(max-width: 768px) 52vw, 360px" className="object-cover object-center" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#ecf9fc]/85" />
        </div>
      </div>

      <div className="grid grid-cols-[1.35fr_.65fr] gap-2 p-2.5">
        <div>
          <div className="mb-1.5 flex items-center justify-between"><p className="text-[6px] font-black text-[#08384b]">خدماتنا الطبية</p><span className="text-[5px] font-bold text-primary">عرض الخدمات</span></div>
          <div className="grid grid-cols-3 gap-1.5">
            {clinicServices.map((service) => (
              <div key={service.label} className="flex items-center gap-1.5 rounded-lg border border-cyan-100 bg-white p-1.5 shadow-sm">
                <span className="grid size-5 shrink-0 place-items-center rounded-md bg-primary/10 text-primary"><Icon name={service.icon} className="size-2.5" /></span>
                <div className="min-w-0"><p className="truncate text-[5px] font-black text-[#08384b]">{service.label}</p><p className="truncate text-[4px] text-slate-400">{service.note}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-[#08384b] p-2 text-white">
          <p className="text-[5px] font-bold text-cyan-200">طبيبتنا</p>
          <div className="mt-1 flex items-center gap-1.5"><span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/10"><Icon name="stethoscope" className="size-3" /></span><div><p className="text-[5px] font-black">د. سارة الخطيب</p><p className="text-[4px] text-white/55">طب الأسرة</p></div></div>
          <p className="mt-1.5 border-t border-white/10 pt-1 text-[4px] text-white/55">عمّان · ٩ ص — ٩ م</p>
        </div>
      </div>
      <div className="grid grid-cols-3 border-t border-cyan-50 bg-[#f8fcfd] px-2.5 py-2 text-[4px] text-slate-500 sm:text-[5px]">
        <div className="flex items-center gap-1.5 border-l border-slate-100"><span className="grid size-5 place-items-center rounded-full bg-white text-primary shadow-sm"><Icon name="globe" className="size-2.5" /></span><div><p className="font-black text-[#08384b]">موقع العيادة</p><p>عمّان، الأردن</p></div></div>
        <div className="flex items-center gap-1.5 border-l border-slate-100 px-2"><span className="grid size-5 place-items-center rounded-full bg-white text-primary shadow-sm"><Icon name="clipboard" className="size-2.5" /></span><div><p className="font-black text-[#08384b]">ساعات العمل</p><p>السبت — الخميس</p></div></div>
        <div className="flex items-center gap-1.5 px-2"><span className="grid size-5 place-items-center rounded-full bg-white text-primary shadow-sm"><Icon name="device" className="size-2.5" /></span><div><p className="font-black text-[#08384b]">اتصل بنا</p><p dir="ltr">+962 7 9000 0000</p></div></div>
      </div>
    </div>
  );
}

function MobileClinicSite() {
  return (
    <div className="absolute bottom-0 right-[1%] z-30 h-[61%] w-[23%] min-w-[104px] overflow-hidden rounded-[24px] border-[5px] border-[#092f40] bg-white shadow-[0_25px_58px_rgba(8,56,75,.3)]">
      <div className="mx-auto h-2.5 w-11 rounded-b-lg bg-[#092f40]" />
      <div className="flex h-7 items-center justify-between border-b border-slate-100 px-2">
        <span className="flex items-center gap-1 text-[6px] font-black text-[#08384b]"><span className="grid size-4 place-items-center rounded bg-primary/10 text-primary"><Icon name="spark" className="size-2.5" /></span>عيادة النور</span>
        <Icon name="menu" className="size-3 text-[#08384b]" />
      </div>
      <div className="relative h-[35%] overflow-hidden">
        <Image src="/images/clinic-interior.png" alt="" fill sizes="125px" className="object-cover object-center" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08384b]/75 to-[#08384b]/10" />
        <div className="absolute inset-x-2 bottom-2 text-center text-white"><p className="text-[7px] font-black leading-3">رعاية قريبة<br />لكل أفراد الأسرة</p><span className="mt-1 inline-flex rounded bg-primary px-2 py-0.5 text-[4px] font-bold">تواصل معنا</span></div>
      </div>
      <div className="px-2 py-1.5">
        <div className="flex items-center justify-between"><p className="text-[5px] font-black text-[#08384b]">خدماتنا</p><span className="text-[4px] text-primary">عرض الكل</span></div>
        <div className="mt-1 grid grid-cols-2 gap-1">
          {clinicServices.slice(0, 2).map((service) => <div key={service.label} className="rounded-md bg-[#eff9fb] p-1 text-center"><Icon name={service.icon} className="mx-auto size-2.5 text-primary" /><p className="mt-0.5 text-[4px] font-bold text-[#08384b]">{service.label}</p></div>)}
        </div>
        <div className="mt-1 flex items-center gap-1 rounded-md border border-slate-100 p-1">
          <span className="grid size-4 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><Icon name="stethoscope" className="size-2" /></span>
          <div><p className="text-[4px] font-black text-[#08384b]">د. سارة الخطيب</p><p className="text-[3px] text-slate-400">طب الأسرة</p></div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 border-t border-slate-100 bg-white py-1 text-center text-[3px] font-bold text-slate-400"><span className="text-primary">الرئيسية</span><span>الخدمات</span><span>تواصل</span></div>
    </div>
  );
}

export function HeroProductShowcase() {
  return (
    <div role="img" aria-label="عرض توضيحي جديد للوحة إدارة عيادتك وموقع عيادة متكامل على الحاسوب والهاتف" className="relative mx-auto aspect-[.9] w-full max-w-[720px] select-none sm:aspect-[1.12] lg:aspect-[1.16]">
      <div className="absolute -left-[3%] top-[9%] size-44 rounded-full bg-primary/16 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-[4%] bottom-[5%] size-40 rounded-full bg-cyan-200/35 blur-3xl" aria-hidden="true" />
      <DashboardShell />
      <DesktopClinicSite />
      <MobileClinicSite />
      <div className="absolute left-[3%] top-[4%] z-40 flex items-center gap-1.5 rounded-full border border-cyan-100 bg-white/95 px-2.5 py-1.5 text-[7px] font-bold text-primary shadow-[0_8px_24px_rgba(8,56,75,.12)] sm:text-[8px]">
        <span className="size-1.5 rounded-full bg-emerald-500" /> معاينة توضيحية
      </div>
    </div>
  );
}
