import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon, type IconName } from "@/components/ui/icon";

const features: { title: string; description: string; icon: IconName; status: "v1" | "planned" }[] = [
  { title: "إدارة المحتوى بسهولة", description: "تحديث معلومات العيادة والخدمات والأطباء والصور والتواصل من لوحة واحدة.", icon: "edit", status: "v1" },
  { title: "تصميم متجاوب", description: "تجربة واضحة ومريحة على الهاتف والجهاز اللوحي وشاشات الكمبيوتر.", icon: "device", status: "v1" },
  { title: "دعم اللغة العربية", description: "واجهة عربية واضحة وسهلة الاستخدام في الموقع ولوحة الإدارة.", icon: "language", status: "v1" },
  { title: "قوالب متعددة", description: "سيُضاف المزيد من القوالب المتخصصة بعد إطلاق القالب الأساسي عالي الجودة.", icon: "template", status: "planned" },
  { title: "تهيئة لمحركات البحث", description: "بيانات وصفية مخصصة لكل عيادة جزء من اتجاه التطوير للمواقع المنشورة.", icon: "search", status: "planned" },
  { title: "ربط نطاق مخصص", description: "استخدم عنوان موقع يحمل اسم عيادتك عند توفر هذه الميزة.", icon: "globe", status: "planned" },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 bg-[#fbfeff] pb-20 pt-8 sm:pb-24 sm:pt-12">
      <Container>
        <div className="text-center">
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">مميزات المنصة</span>
          <SectionHeading className="mx-auto mt-3 max-w-2xl" title="كل ما تحتاجه في مكان واحد" description="الأدوات الأساسية موضحة بوضوح، وكذلك المزايا المخطط إضافتها لاحقًا." />
        </div>

        <ul className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-12">
          {features.map((feature, index) => (
            <li
              key={feature.title}
              className={`group relative flex gap-4 overflow-hidden rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:border-primary/35 ${
                index === 0
                  ? "border-primary/20 bg-[#eaf9fc] shadow-[0_14px_40px_rgba(7,90,116,.08)] sm:col-span-2 lg:col-span-7 lg:min-h-[190px] lg:p-7"
                  : index === 1
                    ? "border-cyan-100 bg-white lg:col-span-5 lg:p-7"
                    : index === 5
                      ? "border-dashed border-amber-200 bg-[#fffdf8] sm:col-span-2 lg:col-span-12 lg:items-center"
                      : "border-cyan-100 bg-white shadow-[0_8px_30px_rgba(7,90,116,.04)] lg:col-span-4"
              }`}
            >
              {index === 0 && <span className="pointer-events-none absolute -bottom-14 -left-10 size-40 rounded-full bg-primary/10" aria-hidden="true" />}
              <span className={`grid shrink-0 place-items-center text-primary transition group-hover:bg-primary group-hover:text-white ${index === 0 ? "size-12 rounded-xl bg-white shadow-sm" : "size-11 rounded-full bg-[#e8f8fc]"}`}>
                <Icon name={feature.icon} className="size-5.5" />
              </span>
              <div className={`relative min-w-0 flex-1 ${index === 1 ? "flex flex-col" : ""}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-black text-[#08384b] sm:text-base">{feature.title}</h3>
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-black ${feature.status === "v1" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                    {feature.status === "v1" ? "عند الإطلاق" : "لاحقًا"}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-6 text-[#5b7480] sm:text-sm">{feature.description}</p>
                {index === 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {["بيانات العيادة", "الخدمات", "الكادر الطبي"].map((item) => (
                      <span key={item} className="rounded-lg border border-white bg-white/80 px-2 py-2 text-center text-[10px] font-bold text-[#34566a] shadow-sm">{item}</span>
                    ))}
                  </div>
                )}
                {index === 1 && (
                  <div className="mt-auto flex items-end gap-2 pt-4" aria-hidden="true">
                    <span className="relative h-12 flex-1 rounded-lg border-2 border-primary/25 bg-[#f7fcfd] shadow-sm">
                      <span className="absolute inset-x-2 top-2 h-1.5 rounded bg-primary/15" />
                      <span className="absolute inset-x-2 top-5 h-1 rounded bg-slate-200" />
                      <span className="absolute bottom-1.5 right-2 h-2 w-7 rounded bg-primary/20" />
                    </span>
                    <span className="relative h-10 w-8 rounded-md border-2 border-primary/25 bg-[#f7fcfd] shadow-sm">
                      <span className="absolute inset-x-1.5 top-2 h-1 rounded bg-primary/20" />
                      <span className="absolute inset-x-1.5 top-4 h-3 rounded bg-slate-100" />
                    </span>
                    <span className="relative h-8 w-4 rounded-[5px] border-2 border-primary/35 bg-white shadow-sm">
                      <span className="absolute inset-x-0.5 top-1.5 h-2 rounded-sm bg-primary/15" />
                    </span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
