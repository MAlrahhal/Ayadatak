"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ClinicTemplate } from "@/components/clinic";
import { ClinicLogo } from "@/components/clinic/clinic-logo";
import { ClinicImageFrame } from "@/components/clinic/clinic-image-frame";
import type { ClinicCollection, ClinicEditableArea, ClinicEditorSlots } from "@/components/clinic/clinic-editor-slots";
import { clinicDayLabels, clinicSocialLabels } from "@/components/clinic/clinic-utils";
import {
  cloneInitialPrototype, getSectionPresentation, parsePrototype, PROTOTYPE_STORAGE_KEY,
  reorderItems, serializePrototype, validatePrototype,
} from "@/lib/dashboard-prototype";
import { addDraftItem, removeDraftItem } from "@/lib/visual-editor-draft";
import { CLINIC_COLOR_PRESETS, DEFAULT_CLINIC_PRIMARY } from "@/lib/clinic-theme";
import { addClinicHeroSlide, MAX_HERO_SLIDES, moveClinicHeroSlide, removeClinicHeroSlide } from "@/lib/clinic-hero-slides";
import type { ClinicContent, ClinicDayOfWeek, ClinicSectionVisibility, ClinicSocialPlatform, ClinicWorkingDay } from "@/types/clinic";

type Target = { kind: "area"; area: ClinicEditableArea | "sections" | "appearance" } | { kind: "item"; collection: ClinicCollection; id: string };
type Change = (mutate: (next: ClinicContent) => void) => void;

const panelButton = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#cce3e9] bg-white px-3 text-sm font-bold text-[#164b60] transition hover:border-[#089fc5] hover:bg-[#f2fbfd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#089fc5] disabled:opacity-40";
const canvasButton = "inline-flex min-h-10 items-center justify-center gap-1 rounded-xl border border-[#d6e6eb] bg-white/95 px-3 text-xs font-bold text-[#124e68] shadow-[0_3px_12px_rgba(6,48,67,.08)] transition hover:border-[#089fc5] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#089fc5]";
const inputClass = "min-h-11 w-full rounded-xl border border-[#c6dfe6] bg-white px-3 py-2.5 text-sm text-[#123b4c] outline-none focus:border-[#089fc5] focus:ring-2 focus:ring-[#089fc5]/20";
const sectionLabels: { key: keyof ClinicSectionVisibility; label: string; area: ClinicEditableArea }[] = [
  { key: "about", label: "عن العيادة", area: "about" },
  { key: "services", label: "الخدمات", area: "services" },
  { key: "doctors", label: "الأطباء", area: "doctors" },
  { key: "testimonials", label: "آراء المرضى", area: "testimonials" },
  { key: "faq", label: "الأسئلة الشائعة", area: "faq" },
  { key: "location", label: "الموقع", area: "location" },
  { key: "workingHours", label: "ساعات العمل", area: "workingHours" },
  { key: "contact", label: "التواصل", area: "contact" },
  { key: "socialLinks", label: "حسابات العيادة", area: "socialLinks" },
];
const areaLabels: Record<ClinicEditableArea | "sections" | "appearance", string> = {
  identity: "اسم العيادة", logo: "شعار العيادة", hero: "الواجهة الرئيسية", heroImage: "صورة الواجهة",
  about: "عن العيادة", services: "الخدمات", doctors: "الأطباء", testimonials: "آراء المرضى",
  faq: "الأسئلة الشائعة", location: "الموقع", workingHours: "ساعات العمل", contact: "التواصل",
  socialLinks: "حسابات العيادة", sections: "إدارة الأقسام", appearance: "المظهر",
};
const collectionLabels: Record<ClinicCollection, { singular: string; add: string }> = {
  services: { singular: "خدمة", add: "إضافة خدمة" },
  doctors: { singular: "طبيب", add: "إضافة طبيب" },
  testimonials: { singular: "رأي", add: "إضافة رأي" },
  faq: { singular: "سؤال", add: "إضافة سؤال" },
};
const dayOrder: ClinicDayOfWeek[] = ["saturday", "sunday", "monday", "tuesday", "wednesday", "thursday", "friday"];
const socialPlatforms: ClinicSocialPlatform[] = ["instagram", "facebook", "x", "youtube", "linkedin", "tiktok"];
const demoHeroImages = [
  { src: "/images/clinic-demo/clinic-reception.webp", alt: "صورة توضيحية لاستقبال عيادة حديثة" },
  { src: "/images/clinic-demo/clinic-corridor.webp", alt: "صورة توضيحية لممر غرف الاستشارة" },
  { src: "/images/clinic-demo/clinic-exterior.webp", alt: "صورة توضيحية لمدخل عيادة حديثة" },
];

function Field({ label, value, onChange, multiline, dir, hint, type = "text" }: {
  label: string; value: string; onChange: (value: string) => void; multiline?: boolean; dir?: "ltr" | "rtl"; hint?: string; type?: string;
}) {
  const id = useId();
  return <div><label htmlFor={id} className="mb-1.5 block text-sm font-bold text-[#17465a]">{label}</label>
    {multiline ? <textarea id={id} rows={4} value={value} onChange={(event) => onChange(event.target.value)} dir={dir} className={`${inputClass} resize-y leading-7`} />
      : <input id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} dir={dir} className={inputClass} />}
    {hint ? <p className="mt-1.5 text-xs leading-5 text-[#5b7986]">{hint}</p> : null}
  </div>;
}

function EditorDialog({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const dialog = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  useEffect(() => {
    opener.current = document.activeElement as HTMLElement;
    const frame = requestAnimationFrame(() => dialog.current?.querySelector<HTMLElement>("button, input, textarea, select")?.focus());
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { cancelAnimationFrame(frame); document.body.style.overflow = previousOverflow; opener.current?.focus(); };
  }, []);
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") { event.preventDefault(); onClose(); }
    if (event.key !== "Tab" || !dialog.current) return;
    const elements = [...dialog.current.querySelectorAll<HTMLElement>("button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href]")];
    if (!elements.length) return;
    if (event.shiftKey && document.activeElement === elements[0]) { event.preventDefault(); elements[elements.length - 1].focus(); }
    else if (!event.shiftKey && document.activeElement === elements[elements.length - 1]) { event.preventDefault(); elements[0].focus(); }
  };
  return <div className="fixed inset-0 z-[100] flex items-end justify-end bg-[#062d3e]/45 sm:items-stretch" dir="rtl" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div ref={dialog} role="dialog" aria-modal="true" aria-label={title} onKeyDown={handleKeyDown} className="flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[1.5rem] bg-[#f8fcfd] shadow-2xl sm:max-h-none sm:w-[min(440px,100vw)] sm:rounded-none sm:rounded-s-[1.5rem]">
      <div className="flex items-center justify-between gap-3 border-b border-[#d8eaf0] bg-white px-5 py-4">
        <div><p className="text-xs font-bold text-[#0789ac]">محرر الموقع</p><h2 className="text-lg font-black text-[#10394c]">{title}</h2></div>
        <button type="button" onClick={onClose} aria-label="إغلاق المحرر" className={`${panelButton} px-3`}>إغلاق</button>
      </div>
      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-5 pb-8">{children}</div>
    </div>
  </div>;
}

function WorkingHoursFields({ clinic, change }: { clinic: ClinicContent; change: Change }) {
  const updateDay = (day: ClinicDayOfWeek, mutate: (item: ClinicWorkingDay) => ClinicWorkingDay) => change((next) => {
    next.workingHours = next.workingHours.map((item) => item.day === day ? mutate(item) : item);
  });
  return <div className="space-y-3">{dayOrder.map((day) => {
    const item = clinic.workingHours.find((entry) => entry.day === day);
    if (!item) return null;
    return <div key={day} className="rounded-xl border border-[#dbeaf0] bg-white p-4">
      <div className="flex items-center justify-between gap-3"><strong className="text-sm text-[#183e50]">{clinicDayLabels[day]}</strong><label className="flex min-h-11 items-center gap-2 text-sm font-bold text-[#436576]"><input type="checkbox" checked={item.isOpen} onChange={(event) => updateDay(day, (current) => ({ ...current, isOpen: event.target.checked, periods: event.target.checked && current.periods.length === 0 ? [{ opensAt: "09:00", closesAt: "17:00" }] : current.periods }))} className="size-5 accent-[#089fc5]" />{item.isOpen ? "مفتوح" : "مغلق"}</label></div>
      {item.isOpen ? <div className="mt-3 space-y-3">{item.periods.map((period, index) => <div key={index} className="flex flex-wrap items-end gap-2"><label className="text-xs text-[#5c7985]">من<input aria-label={`${clinicDayLabels[day]} من، فترة ${index + 1}`} type="time" value={period.opensAt} onChange={(event) => updateDay(day, (current) => ({ ...current, periods: current.periods.map((entry, i) => i === index ? { ...entry, opensAt: event.target.value } : entry) }))} className={`${inputClass} mt-1 w-32`} /></label><label className="text-xs text-[#5c7985]">إلى<input aria-label={`${clinicDayLabels[day]} إلى، فترة ${index + 1}`} type="time" value={period.closesAt} onChange={(event) => updateDay(day, (current) => ({ ...current, periods: current.periods.map((entry, i) => i === index ? { ...entry, closesAt: event.target.value } : entry) }))} className={`${inputClass} mt-1 w-32`} /></label><button type="button" className={panelButton} onClick={() => updateDay(day, (current) => ({ ...current, periods: current.periods.filter((_, i) => i !== index) }))}>حذف الفترة</button></div>)}<button type="button" className={panelButton} onClick={() => updateDay(day, (current) => ({ ...current, periods: [...current.periods, { opensAt: "09:00", closesAt: "17:00" }] }))}>+ إضافة فترة</button></div> : null}
    </div>;
  })}</div>;
}

export function VisualWebsiteEditor() {
  const [clinic, setClinic] = useState<ClinicContent | null>(null);
  const [saved, setSaved] = useState<ClinicContent | null>(null);
  const [target, setTarget] = useState<Target | null>(null);
  const [previewChoice, setPreviewChoice] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [selectedSlideId, setSelectedSlideId] = useState<string | undefined>();
  const dirty = Boolean(clinic && saved && JSON.stringify(clinic) !== JSON.stringify(saved));

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const raw = localStorage.getItem(PROTOTYPE_STORAGE_KEY);
        const parsed = raw ? parsePrototype(raw) : null;
        const initial = parsed ?? cloneInitialPrototype();
        setClinic(structuredClone(initial)); setSaved(structuredClone(initial));
        if (raw && !parsed) setMessage("المسودة المحفوظة غير صالحة. عُرضت بيانات النموذج الأصلية؛ راجعها ثم احفظ لاستبدال المسودة التالفة.");
      } catch {
        const initial = cloneInitialPrototype();
        setClinic(structuredClone(initial)); setSaved(structuredClone(initial));
        setMessage("التخزين المحلي غير متاح. يمكنك التجربة، لكن الحفظ قد لا يعمل في هذا المتصفح.");
      }
    });
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const change: Change = (mutate) => {
    setClinic((current) => { if (!current) return current; const next = structuredClone(current); mutate(next); return next; });
    setErrors([]); setMessage("");
  };
  const save = () => {
    if (!clinic) return false;
    const issues = validatePrototype(clinic);
    if (issues.length) { setErrors(issues); setMessage("راجع الحقول المطلوبة قبل الحفظ."); return false; }
    try { localStorage.setItem(PROTOTYPE_STORAGE_KEY, serializePrototype(clinic)); setSaved(structuredClone(clinic)); setMessage("حُفظت المسودة في هذا المتصفح. لم تُنشر على الموقع العام."); setErrors([]); return true; }
    catch { setMessage("تعذر حفظ المسودة في هذا المتصفح."); return false; }
  };
  const reset = () => {
    if (!window.confirm("إعادة بيانات النموذج الأصلية؟ سيُحذف الحفظ المحلي وتُفقد تغييرات هذا النموذج.")) return;
    try { localStorage.removeItem(PROTOTYPE_STORAGE_KEY); } catch { setMessage("تعذر حذف المسودة المحلية."); return; }
    const initial = cloneInitialPrototype(); setClinic(structuredClone(initial)); setSaved(structuredClone(initial));
    setTarget(null); setErrors([]); setMessage("استُعيدت بيانات النموذج الأصلية.");
  };
  const addItem = (collection: ClinicCollection) => {
    const id = crypto.randomUUID();
    setClinic((current) => current ? addDraftItem(current, collection, id) : current);
    setErrors([]); setMessage("");
    setTarget({ kind: "item", collection, id });
  };
  const deleteItem = (collection: ClinicCollection, id: string) => {
    if (!window.confirm(`حذف هذا ${collectionLabels[collection].singular} من المسودة الحالية؟`)) return;
    setClinic((current) => current ? removeDraftItem(current, collection, id) : current);
    setErrors([]); setMessage("");
    if (target?.kind === "item" && target.id === id) setTarget(null);
  };
  const moveItem = (collection: ClinicCollection, index: number, direction: -1 | 1) => change((next) => {
    if (collection === "services") next.services = reorderItems(next.services, index, direction);
    if (collection === "doctors") next.doctors = reorderItems(next.doctors, index, direction);
    if (collection === "testimonials") next.testimonials = reorderItems(next.testimonials, index, direction);
    if (collection === "faq") next.faq = reorderItems(next.faq, index, direction);
  });
  const slots: ClinicEditorSlots = {
    selectedSlideId,
    onSelectSlide: setSelectedSlideId,
    edit: (area) => <button type="button" className={canvasButton} aria-label={`تعديل ${areaLabels[area]}`} title={`تعديل ${areaLabels[area]}`} onClick={() => setTarget({ kind: "area", area })}>{area === "logo" || area === "heroImage" ? "▣" : "✎"} <span className="hidden sm:inline">{area === "logo" || area === "heroImage" ? "تغيير الصورة" : areaLabels[area]}</span></button>,
    item: (collection, id, index, length) => <details className="group relative w-fit" aria-label={`إجراءات ${collectionLabels[collection].singular}`}>
      <summary className={`${canvasButton} cursor-pointer list-none marker:hidden`} aria-label={`إدارة ${collectionLabels[collection].singular}`}>⋯ <span>إدارة</span></summary>
      <div className="mt-2 flex flex-wrap gap-1 rounded-xl border border-[#d6e6eb] bg-[#f8fcfd] p-1.5">
        <button type="button" className={canvasButton} onClick={() => setTarget({ kind: "item", collection, id })}>تعديل</button>
        <button type="button" className={canvasButton} onClick={() => moveItem(collection, index, -1)} disabled={index === 0} aria-label={`تقديم ${collectionLabels[collection].singular}`} title="تقديم" style={{ opacity: index === 0 ? .4 : 1 }}>↑</button>
        <button type="button" className={canvasButton} onClick={() => moveItem(collection, index, 1)} disabled={index === length - 1} aria-label={`تأخير ${collectionLabels[collection].singular}`} title="تأخير" style={{ opacity: index === length - 1 ? .4 : 1 }}>↓</button>
        <button type="button" className={`${canvasButton} text-rose-700`} onClick={() => deleteItem(collection, id)} aria-label={`حذف ${collectionLabels[collection].singular}`}>حذف</button>
      </div>
    </details>,
    add: (collection) => <button type="button" className={panelButton} onClick={() => addItem(collection)}>+ {collectionLabels[collection].add}</button>,
  };

  if (!clinic) return <main dir="rtl" className="grid min-h-screen place-items-center bg-[#f7fbfc] text-sm text-[#537584]">جارٍ تحميل محرر الموقع...</main>;

  return <div dir="rtl" className="min-h-screen bg-white">
    <div className="relative z-[60] border-b border-[#d7e7ee] bg-[#f7fbfd] px-3 py-2.5 sm:px-6">
      <div className="mx-auto flex max-w-[1480px] flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5"><ClinicLogo image={clinic.identity.logo} className="size-10" /><div className="min-w-0"><p className="max-w-40 truncate text-sm font-black text-[#102B41]">{clinic.identity.nameAr}</p><p className="text-[11px] font-semibold text-[#5b7b89]">وضع التحرير</p></div></div>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button type="button" className={panelButton} onClick={() => setTarget({ kind: "area", area: "sections" })}>إدارة الأقسام</button>
          <button type="button" className={panelButton} onClick={() => setTarget({ kind: "area", area: "appearance" })}>المظهر</button>
          <span className="hidden px-2 text-xs font-semibold text-[#557483] lg:inline">{dirty ? "● تغييرات غير محفوظة" : "المسودة محفوظة"}</span>
          {dirty ? <button type="button" className={`${panelButton} border-[#b8d7e6] text-[#0b5c9a]`} onClick={() => setPreviewChoice(true)}>معاينة الموقع</button>
            : <a href="/dashboard-demo?preview=1" target="_blank" rel="noopener noreferrer" className={`${panelButton} border-[#b8d7e6] text-[#0b5c9a]`}>معاينة الموقع</a>}
          <button type="button" onClick={save} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#102B52] px-4 text-sm font-bold text-white transition hover:bg-[#173e73] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#089fc5] focus-visible:ring-offset-2">حفظ التعديلات</button>
        </div>
      </div>
      {dirty || message ? <div role="status" className="mx-auto mt-1 max-w-[1440px] text-xs font-medium text-[#3d6a7c]">{dirty ? "تغييرات غير محفوظة · تظهر الآن في المحرر فقط" : message}</div> : null}
      {errors.length ? <div role="alert" className="mx-auto mt-2 max-w-[1440px] text-xs font-bold text-rose-700">{errors.join(" ")}</div> : null}
    </div>
    <ClinicTemplate clinic={clinic} editor={slots} />

    {previewChoice ? <EditorDialog title="معاينة المسودة" onClose={() => setPreviewChoice(false)}><p className="text-sm leading-7 text-[#456a7a]">لديك تغييرات غير محفوظة. المعاينة تعرض آخر نسخة محفوظة فقط؛ يمكنك حفظ التعديلات أولًا أو معاينة النسخة المحفوظة.</p><div className="flex flex-wrap gap-2"><a href="/dashboard-demo?preview=1" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-xl bg-[#079dc2] px-4 text-sm font-bold text-white" onClick={(event) => { if (!save()) event.preventDefault(); else setPreviewChoice(false); }}>حفظ ثم معاينة</a><a href="/dashboard-demo?preview=1" target="_blank" rel="noopener noreferrer" className={panelButton} onClick={() => setPreviewChoice(false)}>معاينة المحفوظ</a></div></EditorDialog> : null}
    {target ? <EditorDialog title={target.kind === "area" ? areaLabels[target.area] : `تعديل ${collectionLabels[target.collection].singular}`} onClose={() => setTarget(null)}>
      {target.kind === "area" ? <AreaFields clinic={clinic} area={target.area} change={change} reset={reset} openArea={(area) => setTarget({ kind: "area", area })} addItem={addItem} selectedSlideId={selectedSlideId} selectSlide={setSelectedSlideId} />
        : <ItemFields clinic={clinic} collection={target.collection} id={target.id} change={change} remove={() => deleteItem(target.collection, target.id)} />}
      <p className="border-t border-[#deebef] pt-4 text-xs leading-6 text-[#637e89]">تظهر التغييرات على الصفحة فورًا. اضغط «حفظ التعديلات» في الشريط العلوي لحفظها في هذا المتصفح.</p>
    </EditorDialog> : null}
  </div>;
}

function AreaFields({ clinic, area, change, reset, openArea, addItem, selectedSlideId, selectSlide }: {
  clinic: ClinicContent; area: ClinicEditableArea | "sections" | "appearance"; change: Change; reset: () => void;
  openArea: (area: ClinicEditableArea) => void; addItem: (collection: ClinicCollection) => void;
  selectedSlideId?: string; selectSlide: (id: string | undefined) => void;
}) {
  const setVisibility = (key: keyof ClinicSectionVisibility, visible: boolean) => change((next) => { next.sectionVisibility[key] = visible; });
  if (area === "sections") return <><p className="text-sm leading-7 text-[#547484]">اختر الأقسام التي تظهر للزائر. يبقى محتوى الأقسام المخفية محفوظًا، ويمكن إظهارها مجددًا هنا.</p>
    <div className="space-y-2">{sectionLabels.map(({ key, label, area: editArea }) => {
      const state = getSectionPresentation(clinic, key);
      return <div key={key} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#deebef] bg-white p-3">
        <div><strong className="text-sm text-[#163d50]">{label}</strong><p className="text-xs text-[#64818b]">{state === "hidden" ? "مخفي" : state === "empty" ? "ظاهر بعد إضافة محتوى" : "ظاهر"}</p></div>
        <div className="flex items-center gap-2"><button type="button" className={panelButton} onClick={() => openArea(editArea)}>تحرير</button><label className="flex min-h-11 items-center gap-1.5 text-xs font-bold text-[#24566a]"><input type="checkbox" aria-label={`إظهار ${label}`} checked={clinic.sectionVisibility[key]} onChange={(event) => setVisibility(key, event.target.checked)} className="size-5 accent-[#089fc5]" />إظهار</label></div>
      </div>;
    })}</div><button type="button" className={`${panelButton} border-rose-200 text-rose-700`} onClick={reset}>استعادة بيانات النموذج الأصلية</button></>;
  if (area === "appearance") return <AppearanceFields clinic={clinic} change={change} openArea={openArea} selectedSlideId={selectedSlideId} selectSlide={selectSlide} />;
  if (area === "identity") return <><Field label="اسم العيادة" value={clinic.identity.nameAr} onChange={(value) => change((next) => { next.identity.nameAr = value; })} /><Field label="الجملة التعريفية" value={clinic.identity.tagline ?? ""} onChange={(value) => change((next) => { next.identity.tagline = value; })} /></>;
  if (area === "logo") return <><div className="flex items-center gap-3 rounded-xl border border-[#deebef] bg-white p-3"><ClinicLogo image={clinic.identity.logo} className="size-16" /><div><p className="text-sm font-bold text-[#17465a]">الشعار الحالي</p><p className="text-xs text-[#67838e]">صورة توضيحية أو رابط تختاره العيادة</p></div></div><Field label="رابط صورة الشعار" value={clinic.identity.logo?.src ?? ""} onChange={(value) => change((next) => { next.identity.logo = value ? { src: value, alt: next.identity.nameAr } : undefined; })} dir="ltr" hint="مسار محلي أو رابط صورة مباشر. رفع الملفات غير متاح في هذا النموذج." /><Field label="النص البديل للشعار" value={clinic.identity.logo?.alt ?? ""} onChange={(value) => change((next) => { next.identity.logo = { src: next.identity.logo?.src ?? "", alt: value }; })} /><button type="button" className={panelButton} onClick={() => change((next) => { next.identity.logo = { src: "/images/clinic-demo/al-noor-mark.svg", alt: "رمز توضيحي لعيادة النور" }; })}>استخدام الرمز التجريبي</button></>;
  if (area === "hero") return <><Field label="عنوان الواجهة" value={clinic.hero.headline} onChange={(value) => change((next) => { next.hero.headline = value; })} /><Field label="وصف الواجهة" value={clinic.hero.description} onChange={(value) => change((next) => { next.hero.description = value; })} multiline /><button type="button" className={panelButton} onClick={() => openArea("heroImage")}>إدارة صور الواجهة</button></>;
  if (area === "heroImage") return <HeroImagesFields clinic={clinic} change={change} selectedSlideId={selectedSlideId} selectSlide={selectSlide} />;
  if (area === "about") return <><Field label="نبذة عن العيادة" value={clinic.identity.about} onChange={(value) => change((next) => { next.identity.about = value; })} multiline /><VisibilityField label="عن العيادة" visible={clinic.sectionVisibility.about} setVisible={(value) => setVisibility("about", value)} /></>;
  if (area === "services" || area === "doctors" || area === "testimonials" || area === "faq") return <><p className="text-sm leading-7 text-[#547484]">حرّر العناصر مباشرة من بطاقاتها على الموقع، أو أضف عنصرًا جديدًا هنا.</p><VisibilityField label={areaLabels[area]} visible={clinic.sectionVisibility[area]} setVisible={(value) => setVisibility(area, value)} /><button type="button" className={panelButton} onClick={() => addItem(area)}>+ {collectionLabels[area].add}</button>{area === "testimonials" ? <p className="text-xs leading-6 text-[#64818b]">لا تُنشأ آراء تلقائية؛ أضف فقط رأيًا تملكه العيادة ولديها موافقة على عرضه.</p> : null}</>;
  if (area === "location") return <><Field label="عنوان العيادة" value={clinic.location.address} onChange={(value) => change((next) => { next.location.address = value; })} multiline /><Field label="رابط الخريطة" value={clinic.location.mapUrl ?? ""} onChange={(value) => change((next) => { next.location.mapUrl = value; })} dir="ltr" /><VisibilityField label="الموقع" visible={clinic.sectionVisibility.location} setVisible={(value) => setVisibility("location", value)} /></>;
  if (area === "workingHours") return <><WorkingHoursFields clinic={clinic} change={change} /><VisibilityField label="ساعات العمل" visible={clinic.sectionVisibility.workingHours} setVisible={(value) => setVisibility("workingHours", value)} /></>;
  if (area === "contact") return <><Field label="رقم الهاتف" value={clinic.contact.phone} onChange={(value) => change((next) => { next.contact.phone = value; })} dir="ltr" /><Field label="رقم واتساب" value={clinic.contact.whatsapp ?? ""} onChange={(value) => change((next) => { next.contact.whatsapp = value; })} dir="ltr" /><Field label="البريد الإلكتروني" value={clinic.contact.email ?? ""} onChange={(value) => change((next) => { next.contact.email = value; })} dir="ltr" /><VisibilityField label="التواصل" visible={clinic.sectionVisibility.contact} setVisible={(value) => setVisibility("contact", value)} /></>;
  return <><p className="text-xs leading-6 text-[#64818b]">أضف روابط حقيقية فقط؛ الروابط الخارجية معطّلة في المعاينة التجريبية.</p>{clinic.socialLinks.map((link, index) => <div key={`${link.platform}-${index}`} className="space-y-2 rounded-xl border border-[#deebef] bg-white p-3"><label className="block text-sm font-bold text-[#17465a]">المنصة<select value={link.platform} onChange={(event) => change((next) => { next.socialLinks[index].platform = event.target.value as ClinicSocialPlatform; })} className={`${inputClass} mt-1.5`}>{socialPlatforms.map((platform) => <option key={platform} value={platform}>{clinicSocialLabels[platform]}</option>)}</select></label><Field label={`رابط ${clinicSocialLabels[link.platform]}`} value={link.url} onChange={(value) => change((next) => { next.socialLinks[index].url = value; })} dir="ltr" /><button type="button" className={`${panelButton} text-rose-700`} onClick={() => change((next) => { next.socialLinks = next.socialLinks.filter((_, i) => i !== index); })}>حذف الرابط</button></div>)}<button type="button" className={panelButton} onClick={() => change((next) => { next.socialLinks = [...next.socialLinks, { platform: "instagram", url: "" }]; })}>+ إضافة رابط</button><VisibilityField label="حسابات العيادة" visible={clinic.sectionVisibility.socialLinks} setVisible={(value) => setVisibility("socialLinks", value)} /></>;
}

function AppearanceFields({ clinic, change, openArea, selectedSlideId, selectSlide }: {
  clinic: ClinicContent; change: Change; openArea: (area: ClinicEditableArea) => void;
  selectedSlideId?: string; selectSlide: (id: string | undefined) => void;
}) {
  const color = clinic.identity.brandColors?.primary ?? DEFAULT_CLINIC_PRIMARY;
  const setColor = (primary: string) => change((next) => { next.identity.brandColors = { ...next.identity.brandColors, primary }; });
  return <>
    <p className="text-sm leading-7 text-[#547484]">لون رئيسي واحد، شعار، وصور للواجهة. تظهر التغييرات مباشرة في صفحة العيادة قبل حفظ المسودة.</p>
    <section aria-label="اللون الرئيسي" className="space-y-3 rounded-2xl border border-[#deebef] bg-white p-4">
      <h3 className="text-sm font-black text-[#143d51]">اللون الرئيسي للموقع</h3>
      <p className="text-xs leading-5 text-[#607d89]">يُطبّق على الأزرار والروابط والعناصر الرئيسية مع لون نص مناسب للتباين.</p>
      <div className="flex flex-wrap gap-3">{CLINIC_COLOR_PRESETS.map((preset) => <button key={preset} type="button" onClick={() => setColor(preset)} aria-label={`اختيار اللون ${preset}`} aria-pressed={color.toLowerCase() === preset.toLowerCase()} className="grid size-10 place-items-center rounded-full border-2 border-white shadow-[0_0_0_1px_#d2e4ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#089fc5]" style={{ backgroundColor: preset }}>{color.toLowerCase() === preset.toLowerCase() ? <span className="grid size-6 place-items-center rounded-full bg-white text-sm font-black text-[#143d51]" aria-hidden="true">✓</span> : null}</button>)}</div>
      <label className="flex items-center justify-between gap-3 text-xs font-bold text-[#17465a]">لون مخصص <input type="color" aria-label="لون رئيسي مخصص" value={color} onChange={(event) => setColor(event.target.value)} className="h-11 w-20 cursor-pointer rounded-lg border border-[#c6dfe6] bg-white p-1" /></label>
    </section>
    <section aria-label="شعار العيادة" className="rounded-2xl border border-[#deebef] bg-white p-4">
      <h3 className="text-sm font-black text-[#143d51]">شعار العيادة</h3>
      <div className="mt-3 flex items-center justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><ClinicLogo image={clinic.identity.logo} className="size-14" /><span className="truncate text-sm font-bold text-[#315d70]">{clinic.identity.nameAr}</span></div><button type="button" className={panelButton} onClick={() => openArea("logo")}>تغيير الشعار</button></div>
    </section>
    <section aria-label="صور الواجهة" className="space-y-4 rounded-2xl border border-[#deebef] bg-white p-4"><h3 className="text-sm font-black text-[#143d51]">صور الواجهة الرئيسية</h3><HeroImagesFields clinic={clinic} change={change} selectedSlideId={selectedSlideId} selectSlide={selectSlide} /></section>
  </>;
}

function HeroImagesFields({ clinic, change, selectedSlideId, selectSlide }: {
  clinic: ClinicContent; change: Change; selectedSlideId?: string; selectSlide: (id: string | undefined) => void;
}) {
  const slides = clinic.hero.slides;
  const selected = slides.find((slide) => slide.id === selectedSlideId) ?? slides[0];
  const selectedIndex = slides.findIndex((slide) => slide.id === selected.id);
  const addSlide = () => {
    const image = demoHeroImages[slides.length % demoHeroImages.length];
    const id = crypto.randomUUID();
    change((next) => { next.hero.slides = addClinicHeroSlide(next.hero.slides, image, id); });
    selectSlide(id);
  };
  const updateImage = (field: "src" | "alt", value: string) => change((next) => {
    const slide = next.hero.slides.find((item) => item.id === selected.id);
    if (slide) slide.image[field] = value;
  });
  return <div className="space-y-4">
    <p className="text-xs leading-5 text-[#607d89]">من صورة واحدة إلى خمس صور. اختر صورة لمعاينتها، ثم غيّر الرابط أو الترتيب. الصور المرفقة توضيحية؛ رفع الملفات غير متاح بعد.</p>
    <div className="space-y-2">{slides.map((slide, index) => <div key={slide.id} className={`flex items-center gap-2 rounded-xl border p-2 ${slide.id === selected.id ? "border-[#0b6ea9] bg-[#f2f9fc]" : "border-[#deebef] bg-white"}`}>
      <button type="button" onClick={() => selectSlide(slide.id)} aria-label={`اختيار صورة الواجهة ${index + 1}`} aria-pressed={slide.id === selected.id} className="flex min-w-0 flex-1 items-center gap-3 rounded-lg text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#089fc5]"><ClinicImageFrame image={slide.image} fallbackLabel="صورة" className="h-14 w-20 shrink-0 rounded-lg" sizes="80px" /><span className="min-w-0 text-xs font-bold text-[#17465a]">الصورة {index + 1}{slide.id === selected.id ? " · معروضة الآن" : ""}</span></button>
      <button type="button" className={`${canvasButton} px-2`} onClick={() => change((next) => { next.hero.slides = moveClinicHeroSlide(next.hero.slides, slide.id, -1); })} disabled={index === 0} aria-label={`تقديم الصورة ${index + 1}`}>↑</button>
      <button type="button" className={`${canvasButton} px-2`} onClick={() => change((next) => { next.hero.slides = moveClinicHeroSlide(next.hero.slides, slide.id, 1); })} disabled={index === slides.length - 1} aria-label={`تأخير الصورة ${index + 1}`}>↓</button>
      <button type="button" className={`${canvasButton} px-2 text-rose-700`} onClick={() => { change((next) => { next.hero.slides = removeClinicHeroSlide(next.hero.slides, slide.id); }); if (selectedSlideId === slide.id) selectSlide(undefined); }} disabled={slides.length <= 1} aria-label={`حذف الصورة ${index + 1}`}>×</button>
    </div>)}</div>
    <button type="button" className={panelButton} onClick={addSlide} disabled={slides.length >= MAX_HERO_SLIDES}>+ إضافة صورة توضيحية ({slides.length}/{MAX_HERO_SLIDES})</button>
    <div className="space-y-3 border-t border-[#deebef] pt-4"><p className="text-sm font-black text-[#143d51]">تغيير الصورة {selectedIndex + 1}</p><Field label="رابط الصورة" value={selected.image.src} onChange={(value) => updateImage("src", value)} dir="ltr" hint="استخدم مسارًا محليًا أو رابط صورة مباشرًا. لا توجد خدمة رفع في هذا النموذج." /><Field label="وصف الصورة البديل" value={selected.image.alt} onChange={(value) => updateImage("alt", value)} /></div>
    <div><p className="mb-2 text-xs font-bold text-[#607d89]">صور توضيحية جاهزة</p><div className="grid grid-cols-3 gap-2">{demoHeroImages.map((image, index) => <button type="button" key={image.src} onClick={() => change((next) => { const slide = next.hero.slides.find((item) => item.id === selected.id); if (slide) slide.image = { ...image }; })} aria-label={`استخدام الصورة التوضيحية ${index + 1}`} className="overflow-hidden rounded-xl border border-[#deebef] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#089fc5]"><ClinicImageFrame image={image} fallbackLabel="صورة" className="aspect-[4/3]" sizes="120px" /></button>)}</div></div>
  </div>;
}

function VisibilityField({ label, visible, setVisible }: { label: string; visible: boolean; setVisible: (value: boolean) => void }) {
  return <label className="flex min-h-11 items-center gap-2 rounded-xl border border-[#deebef] bg-white p-3 text-sm font-bold text-[#24566a]"><input type="checkbox" checked={visible} onChange={(event) => setVisible(event.target.checked)} className="size-5 accent-[#089fc5]" />إظهار قسم {label} في الموقع</label>;
}

function ItemFields({ clinic, collection, id, change, remove }: { clinic: ClinicContent; collection: ClinicCollection; id: string; change: Change; remove: () => void }) {
  if (collection === "services") {
    const item = clinic.services.find((entry) => entry.id === id); if (!item) return null;
    return <><Field label="اسم الخدمة" value={item.name} onChange={(value) => change((next) => { next.services.find((entry) => entry.id === id)!.name = value; })} /><Field label="وصف الخدمة" value={item.description ?? ""} onChange={(value) => change((next) => { next.services.find((entry) => entry.id === id)!.description = value; })} multiline /><Field label="رابط صورة الخدمة" value={item.image?.src ?? ""} onChange={(value) => change((next) => { const entry = next.services.find((part) => part.id === id)!; entry.image = value ? { src: value, alt: entry.name } : undefined; })} dir="ltr" hint="رابط صورة مباشر؛ رفع الملفات غير متاح بعد." /><button type="button" className={`${panelButton} text-rose-700`} onClick={remove}>حذف الخدمة</button></>;
  }
  if (collection === "doctors") {
    const item = clinic.doctors.find((entry) => entry.id === id); if (!item) return null;
    return <><Field label="اسم الطبيب" value={item.name} onChange={(value) => change((next) => { next.doctors.find((entry) => entry.id === id)!.name = value; })} /><Field label="التخصص" value={item.specialty} onChange={(value) => change((next) => { next.doctors.find((entry) => entry.id === id)!.specialty = value; })} /><Field label="نبذة الطبيب" value={item.biography ?? ""} onChange={(value) => change((next) => { next.doctors.find((entry) => entry.id === id)!.biography = value; })} multiline /><Field label="سنوات الخبرة" value={item.yearsOfExperience?.toString() ?? ""} onChange={(value) => change((next) => { next.doctors.find((entry) => entry.id === id)!.yearsOfExperience = value === "" ? undefined : Number(value); })} type="number" /><Field label="رابط صورة الطبيب" value={item.image?.src ?? ""} onChange={(value) => change((next) => { const entry = next.doctors.find((part) => part.id === id)!; entry.image = value ? { src: value, alt: `صورة ${entry.name}` } : undefined; })} dir="ltr" hint="رابط صورة مباشر؛ رفع الملفات غير متاح بعد." /><button type="button" className={`${panelButton} text-rose-700`} onClick={remove}>حذف الطبيب</button></>;
  }
  if (collection === "testimonials") {
    const item = clinic.testimonials.find((entry) => entry.id === id); if (!item) return null;
    return <><Field label="الاسم المعروض" value={item.displayName} onChange={(value) => change((next) => { next.testimonials.find((entry) => entry.id === id)!.displayName = value; })} /><Field label="نص الرأي" value={item.text} onChange={(value) => change((next) => { next.testimonials.find((entry) => entry.id === id)!.text = value; })} multiline /><button type="button" className={`${panelButton} text-rose-700`} onClick={remove}>حذف الرأي</button></>;
  }
  const item = clinic.faq.find((entry) => entry.id === id); if (!item) return null;
  return <><Field label="السؤال" value={item.question} onChange={(value) => change((next) => { next.faq.find((entry) => entry.id === id)!.question = value; })} /><Field label="الإجابة" value={item.answer} onChange={(value) => change((next) => { next.faq.find((entry) => entry.id === id)!.answer = value; })} multiline /><button type="button" className={`${panelButton} text-rose-700`} onClick={remove}>حذف السؤال</button></>;
}
