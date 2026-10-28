import { Icon, type IconName } from "@/components/ui/icon";
import type { ClinicContent } from "@/types/clinic";
import { ClinicContainer, ClinicSectionHeading, clinicFocusClass } from "./clinic-primitives";
import { ClinicImageFrame } from "./clinic-image-frame";
import { getRenderableImage } from "./clinic-utils";
import type { ClinicEditorSlots } from "./clinic-editor-slots";

function sortByDisplayOrder<T extends { displayOrder: number }>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => a.displayOrder - b.displayOrder);
}

export function ClinicAbout({ clinic, editor }: { clinic: ClinicContent; editor?: ClinicEditorSlots }) {
  if (!clinic.sectionVisibility.about || !clinic.identity.about.trim()) return null;

  return (
    <section id="about" className="bg-white py-16 sm:py-20">
      <ClinicContainer className="grid items-center gap-9 lg:grid-cols-[1fr_.95fr] lg:gap-14">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3"><p className="text-sm font-bold text-[var(--clinic-primary-text)]">عن العيادة</p>{editor ? editor.edit("about") : null}</div>
          <h2 className="mt-4 text-[clamp(1.8rem,3vw,2.8rem)] font-black leading-[1.3] text-[#102B41]">رعاية قريبة منكم في {clinic.identity.nameAr}</h2>
          {clinic.identity.tagline ? <p className="mt-3 text-lg font-semibold text-[var(--clinic-primary-text)]">{clinic.identity.tagline}</p> : null}
          <p className="mt-5 max-w-xl text-base leading-9 text-slate-600">{clinic.identity.about}</p>
          {clinic.sectionVisibility.services && clinic.services.length > 0 ? <a href="#services" className={`mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[var(--clinic-primary-text)] underline decoration-[var(--clinic-outline)] underline-offset-8 hover:decoration-[var(--clinic-primary)] ${clinicFocusClass}`}>تعرّف على الخدمات <span aria-hidden="true">←</span></a> : null}
        </div>
        <div className="relative">
          <ClinicImageFrame image={clinic.hero.slides[2]?.image ?? clinic.hero.slides[0]?.image} fallbackLabel="صورة العيادة" className="aspect-[5/4] rounded-[1.5rem] sm:aspect-[16/11] lg:aspect-[5/4]" sizes="(max-width: 1024px) 100vw, 48vw" />
          {editor ? <div className="absolute left-4 top-4 z-10">{editor.edit("heroImage")}</div> : null}
        </div>
      </ClinicContainer>
    </section>
  );
}

const serviceIconNames: Record<string, IconName> = {
  "family-medicine": "heart",
  pediatrics: "people",
  "general-checkups": "stethoscope",
  nutrition: "spark",
};

export function ClinicServices({ clinic, editor }: { clinic: ClinicContent; editor?: ClinicEditorSlots }) {
  if (!clinic.sectionVisibility.services || clinic.services.length === 0) return null;

  return (
    <section id="services" className="bg-[var(--clinic-accent)] py-16 sm:py-20">
      <ClinicContainer>
        <div className="relative">{editor ? <div className="mb-3 flex justify-center">{editor.edit("services")}</div> : null}<ClinicSectionHeading eyebrow="خدمات العيادة" title="خدمات طبية تناسب احتياجاتكم" description="تعرّفوا على خدمات العيادة واختروا ما يناسب احتياجاتكم الصحية." /></div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sortByDisplayOrder(clinic.services).map((service, index, items) => (
            <article key={service.id} className="group flex min-h-52 flex-col rounded-2xl border border-[var(--clinic-outline)] bg-white p-5 shadow-[0_8px_25px_rgba(15,64,84,.04)] transition-shadow hover:shadow-[0_14px_32px_rgba(15,64,84,.1)] motion-reduce:transition-none">
              {getRenderableImage(service.image) ? <ClinicImageFrame image={service.image} fallbackLabel={service.name} className="mb-4 aspect-[16/9] rounded-xl" /> : <span className="grid size-12 place-items-center rounded-2xl bg-[var(--clinic-accent)] text-[var(--clinic-primary-text)]" aria-hidden="true"><Icon name={serviceIconNames[service.icon ?? ""] ?? "stethoscope"} className="size-6" /></span>}
              <h3 className="mt-4 text-lg font-black text-[#102B41]">{service.name}</h3>
              {service.description ? <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p> : null}
              {editor ? <div className="mt-auto pt-4">{editor.item("services", service.id, index, items.length)}</div> : null}
            </article>
          ))}
        </div>
        {editor ? <div className="mt-6 flex justify-center">{editor.add("services")}</div> : null}
      </ClinicContainer>
    </section>
  );
}

export function ClinicDoctors({ clinic, editor }: { clinic: ClinicContent; editor?: ClinicEditorSlots }) {
  if (!clinic.sectionVisibility.doctors || clinic.doctors.length === 0) return null;

  return (
    <section id="doctors" className="bg-white py-16 sm:py-20">
      <ClinicContainer>
        {editor ? <div className="mb-3 flex justify-center">{editor.edit("doctors")}</div> : null}
        <ClinicSectionHeading eyebrow="الفريق الطبي" title="أطباؤنا" description="تعرّفوا على الفريق الذي يقدم خدمات العيادة." />
        <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortByDisplayOrder(clinic.doctors).map((doctor, index, items) => (
            <article key={doctor.id} className="flex flex-col rounded-2xl border border-[var(--clinic-outline)] bg-white p-5 shadow-[0_8px_25px_rgba(15,64,84,.05)]">
              <div className="flex items-center gap-4">
                {getRenderableImage(doctor.image) ? <ClinicImageFrame image={doctor.image} fallbackLabel={doctor.name} className="size-20 shrink-0 rounded-2xl" sizes="80px" /> : <span aria-hidden="true" className="grid size-20 shrink-0 place-items-center rounded-2xl bg-[var(--clinic-accent)] text-2xl font-black text-[var(--clinic-primary-text)]">{doctor.name.replace(/^د\.\s*/, "").split(" ").slice(0, 2).map((part) => part.charAt(0)).join("")}</span>}
                <div className="min-w-0"><p className="text-xs font-bold text-[var(--clinic-primary-text)]">{doctor.specialty}</p><h3 className="mt-1 text-lg font-black text-[#102B41]">{doctor.name}</h3></div>
              </div>
              {doctor.biography ? <p className="mt-4 text-sm leading-7 text-slate-600">{doctor.biography}</p> : null}
              {doctor.yearsOfExperience !== undefined ? <p className="mt-3 text-xs font-semibold text-slate-500">سنوات الخبرة: {doctor.yearsOfExperience}</p> : null}
              {editor ? <div className="mt-auto pt-4">{editor.item("doctors", doctor.id, index, items.length)}</div> : null}
            </article>
          ))}
        </div>
        {editor ? <div className="mt-6 flex justify-center">{editor.add("doctors")}</div> : null}
      </ClinicContainer>
    </section>
  );
}

export function ClinicTestimonials({ clinic, editor }: { clinic: ClinicContent; editor?: ClinicEditorSlots }) {
  if (!clinic.sectionVisibility.testimonials || clinic.testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="bg-slate-950 py-16 text-white sm:py-20 lg:py-24">
      <ClinicContainer>
        {editor ? <div className="mb-3">{editor.edit("testimonials")}</div> : null}
        <ClinicSectionHeading eyebrow="تجارب يشاركها المراجعون" title="آراء أضافتها العيادة" description="هذه الآراء يديرها صاحب العيادة وليست مراجعات موثقة من منصة مستقلة." inverse />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sortByDisplayOrder(clinic.testimonials).map((testimonial, index, items) => (
            <figure key={testimonial.id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <blockquote className="text-base leading-8 text-slate-200">“{testimonial.text}”</blockquote>
              <figcaption className="mt-5 text-sm font-bold text-sky-300">{testimonial.displayName}</figcaption>
              {editor ? <div className="mt-5 border-t border-white/10 pt-3">{editor.item("testimonials", testimonial.id, index, items.length)}</div> : null}
            </figure>
          ))}
        </div>
        {editor ? <div className="mt-6">{editor.add("testimonials")}</div> : null}
      </ClinicContainer>
    </section>
  );
}

export function ClinicFaq({ clinic, editor }: { clinic: ClinicContent; editor?: ClinicEditorSlots }) {
  if (!clinic.sectionVisibility.faq || clinic.faq.length === 0) return null;

  return (
    <section id="faq" className="bg-white py-16 sm:py-20">
      <ClinicContainer className="max-w-4xl">
        {editor ? <div className="mb-3">{editor.edit("faq")}</div> : null}
        <ClinicSectionHeading eyebrow="الأسئلة الشائعة" title="إجابات تساعدكم قبل التواصل" />
        <div className="mt-9 space-y-2.5">
          {sortByDisplayOrder(clinic.faq).map((entry, index, items) => (
            <details key={entry.id} className="group rounded-xl border border-[var(--clinic-outline)] bg-white px-5 open:bg-[var(--clinic-accent)] sm:px-6">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-bold text-[#102B41] marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clinic-primary-text)]">
                <span>{entry.question}</span>
                <span className="text-xl text-[var(--clinic-primary-text)] transition group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="border-t border-[var(--clinic-outline)] pb-5 pt-4 text-sm leading-8 text-slate-600 sm:text-base">{entry.answer}</p>
              {editor ? <div className="border-t border-sky-100 pb-3">{editor.item("faq", entry.id, index, items.length)}</div> : null}
            </details>
          ))}
        </div>
        {editor ? <div className="mt-6">{editor.add("faq")}</div> : null}
      </ClinicContainer>
    </section>
  );
}
