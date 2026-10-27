import { Container } from "@/components/ui/container";
import { Icon, type IconName } from "@/components/ui/icon";

const navigation: { label: string; icon: IconName }[] = [
  { label: "بيانات العيادة", icon: "building" },
  { label: "الخدمات", icon: "clipboard" },
  { label: "الأطباء", icon: "people" },
  { label: "التواصل", icon: "globe" },
];

function DashboardFrame({ active, children, label }: { active: string; children: React.ReactNode; label: string }) {
  return (
    <div role="img" aria-label={label} className="overflow-hidden rounded-[22px] border border-[#bddfe7] bg-white shadow-[0_18px_55px_rgba(8,56,75,.1)]">
      <div className="flex h-8 items-center gap-1.5 border-b border-slate-200 bg-[#f7fafb] px-3" dir="ltr">
        <span className="size-1.5 rounded-full bg-[#ff8f86]" /><span className="size-1.5 rounded-full bg-[#ffd273]" /><span className="size-1.5 rounded-full bg-[#6dd8a2]" />
        <span className="mx-auto rounded-full border border-slate-200 bg-white px-8 py-0.5 text-[5px] text-slate-400">manage.ayadatak.com</span>
      </div>
      <div className="grid min-h-[330px] grid-cols-[108px_1fr] sm:grid-cols-[132px_1fr]">
        <aside className="bg-[#08384b] p-3 text-white sm:p-4">
          <div className="flex items-center gap-1.5 font-black"><span className="grid size-6 place-items-center rounded-lg bg-primary"><Icon name="spark" className="size-3.5" /></span><span className="text-[9px]">عيادتك</span></div>
          <p className="mt-5 text-[5px] font-bold text-white/40">إدارة الموقع</p>
          <div className="mt-2 space-y-1.5">
            {navigation.map((item) => <div key={item.label} className={`flex items-center gap-1.5 rounded-lg px-2 py-2 text-[6px] font-bold sm:text-[7px] ${active === item.label ? "bg-primary text-white" : "text-white/60"}`}><Icon name={item.icon} className="size-3" /><span>{item.label}</span></div>)}
          </div>
        </aside>
        <div className="min-w-0 bg-[#f5fafb] p-3 sm:p-5">{children}</div>
      </div>
    </div>
  );
}

function ClinicProfileConcept() {
  return (
    <DashboardFrame active="بيانات العيادة" label="تصور لواجهة تعديل بيانات ومحتوى العيادة">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div><p className="text-[10px] font-black text-[#08384b] sm:text-xs">بيانات العيادة</p><p className="mt-1 text-[6px] text-slate-400 sm:text-[7px]">المعلومات الأساسية الظاهرة في الموقع</p></div>
        <span className="rounded-lg bg-primary px-3 py-1.5 text-[6px] font-black text-white">حفظ التغييرات</span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_32%]">
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <p className="text-[8px] font-black text-[#08384b]">هوية العيادة</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div><p className="mb-1 text-[5px] font-bold text-slate-400">اسم العيادة</p><div className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-[6px] text-slate-600">عيادة النور لرعاية الأسرة</div></div>
            <div><p className="mb-1 text-[5px] font-bold text-slate-400">التخصص</p><div className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-[6px] text-slate-600">طب الأسرة</div></div>
          </div>
          <div className="mt-3"><p className="mb-1 text-[5px] font-bold text-slate-400">نبذة قصيرة</p><div className="min-h-14 rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-[6px] leading-3 text-slate-500">رعاية طبية متكاملة لكل أفراد الأسرة ضمن بيئة مريحة وفريق متخصص.</div></div>
          <div className="mt-3 grid grid-cols-2 gap-2"><div className="rounded-lg border border-slate-200 px-2 py-2 text-[6px] text-slate-500">عمّان، الأردن</div><div className="rounded-lg border border-slate-200 px-2 py-2 text-[6px] text-slate-500" dir="ltr">+962 7 9000 0000</div></div>
        </div>
        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm"><p className="text-[7px] font-black text-[#08384b]">شعار العيادة</p><div className="mt-2 grid min-h-20 place-items-center rounded-lg border border-dashed border-cyan-200 bg-cyan-50"><span className="grid size-9 place-items-center rounded-xl bg-white text-primary shadow-sm"><Icon name="spark" className="size-4" /></span></div></div>
          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm"><p className="text-[7px] font-black text-[#08384b]">حالة الظهور</p><div className="mt-2 flex items-center justify-between text-[6px] text-slate-500"><span>إظهار معلومات التواصل</span><span className="relative h-4 w-7 rounded-full bg-primary"><i className="absolute left-0.5 top-0.5 size-3 rounded-full bg-white" /></span></div></div>
        </div>
      </div>
    </DashboardFrame>
  );
}

function TeamServicesConcept() {
  return (
    <DashboardFrame active="الأطباء" label="تصور لواجهة إدارة الأطباء والخدمات">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div><p className="text-[10px] font-black text-[#08384b] sm:text-xs">الأطباء والخدمات</p><p className="mt-1 text-[6px] text-slate-400 sm:text-[7px]">تنظيم ما يظهر لزوار موقع العيادة</p></div>
        <span className="rounded-lg bg-primary px-3 py-1.5 text-[6px] font-black text-white">إضافة طبيب</span>
      </div>
      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="flex items-center justify-between"><p className="text-[8px] font-black text-[#08384b]">الفريق الطبي</p><span className="text-[6px] font-bold text-primary">ترتيب الظهور</span></div>
        <div className="mt-3 space-y-2">
          {[['د. سارة الخطيب','طب الأسرة'],['د. عمر الحسن','طب الأطفال']].map(([name, specialty], index) => <div key={name} className="grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-lg border border-slate-100 p-2"><span className={`grid size-8 place-items-center rounded-full ${index === 0 ? "bg-cyan-100 text-primary" : "bg-[#e8eef8] text-[#46627a]"}`}><Icon name="stethoscope" className="size-3.5" /></span><div><p className="text-[7px] font-black text-[#08384b]">{name}</p><p className="text-[5px] text-slate-400">{specialty}</p></div><span className="rounded-md border border-slate-200 px-2 py-1 text-[5px] font-bold text-slate-500">تعديل</span></div>)}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {['طب الأسرة','طب الأطفال','الفحوصات الدورية'].map((service, index) => <div key={service} className="rounded-xl border border-cyan-100 bg-white p-2.5 shadow-sm"><span className="grid size-7 place-items-center rounded-lg bg-primary/10 text-primary"><Icon name={index === 0 ? 'heart' : index === 1 ? 'people' : 'clipboard'} className="size-3.5" /></span><p className="mt-2 text-[6px] font-black text-[#08384b]">{service}</p><p className="mt-1 text-[5px] text-slate-400">ظاهر في الموقع</p></div>)}
      </div>
    </DashboardFrame>
  );
}

export function DashboardConcepts() {
  return (
    <section id="dashboard" className="scroll-mt-20 border-y border-cyan-100 bg-white py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-black text-primary">تصور للوحة الإدارة</p>
          <h2 className="mt-3 text-2xl font-black tracking-[-0.025em] text-[#08384b] sm:text-3xl">محتوى عيادتك، مرتب وواضح</h2>
          <p className="mt-3 text-sm leading-7 text-[#5b7480]">واجهتان توضحان اتجاه إدارة بيانات العيادة وفريقها داخل المنصة.</p>
        </div>
        <div className="mt-9 grid gap-6 xl:grid-cols-2">
          <ClinicProfileConcept />
          <TeamServicesConcept />
        </div>
      </Container>
    </section>
  );
}
