import { Icon, type IconName } from "@/components/ui/icon";
import type { ClinicContent } from "@/types/clinic";
import { ClinicContainer, ClinicImageFrame, ClinicSectionHeading } from "./clinic-primitives";
import { getRenderableImage } from "./clinic-utils";

function sortByDisplayOrder<T extends { displayOrder: number }>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => a.displayOrder - b.displayOrder);
}

export function ClinicAbout({ clinic }: { clinic: ClinicContent }) {
  if (!clinic.sectionVisibility.about || !clinic.identity.about.trim()) return null;

  return (
    <section id="about" className="bg-white py-16 sm:py-20 lg:py-24">
      <ClinicContainer className="grid items-center gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
        <div className="rounded-[2rem] bg-slate-950 p-7 text-white shadow-xl sm:p-10">
          <span className="grid size-14 place-items-center rounded-2xl bg-white/10 text-2xl" aria-hidden="true">✚</span>
          <p className="mt-8 text-sm font-bold text-sky-300">عن العيادة</p>
          <h2 className="mt-2 text-3xl font-black leading-tight">{clinic.identity.nameAr}</h2>
          {clinic.identity.tagline ? <p className="mt-4 text-lg leading-8 text-slate-300">{clinic.identity.tagline}</p> : null}
        </div>
        <div>
          <p className="text-sm font-bold text-[var(--clinic-primary)]">رعاية تتمحور حولكم</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">رعاية طبية بتواصل واضح واهتمام حقيقي</h2>
          <p className="mt-6 text-base leading-9 text-slate-600 sm:text-lg">{clinic.identity.about}</p>
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

export function ClinicServices({ clinic }: { clinic: ClinicContent }) {
  if (!clinic.sectionVisibility.services || clinic.services.length === 0) return null;

  return (
    <section id="services" className="bg-sky-50/70 py-16 sm:py-20 lg:py-24">
      <ClinicContainer>
        <ClinicSectionHeading eyebrow="خدمات العيادة" title="رعاية متكاملة لاحتياجاتكم الصحية" description="نقدم خدمات واضحة ومتكاملة ضمن بيئة مهنية وهادئة." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {sortByDisplayOrder(clinic.services).map((service) => (
            <article key={service.id} className="group rounded-2xl border border-sky-100 bg-white p-6 shadow-[0_10px_35px_rgba(15,64,84,.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,64,84,.1)]">
              {getRenderableImage(service.image) ? <ClinicImageFrame image={service.image} fallbackLabel={service.name} className="-mx-2 -mt-2 mb-5 aspect-[16/9] rounded-xl" /> : <span className="grid size-14 place-items-center rounded-2xl bg-[var(--clinic-accent)] text-[var(--clinic-primary)]" aria-hidden="true"><Icon name={serviceIconNames[service.icon ?? ""] ?? "stethoscope"} className="size-7" /></span>}
              <h3 className="mt-5 text-lg font-black text-slate-900">{service.name}</h3>
              {service.description ? <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p> : null}
            </article>
          ))}
        </div>
      </ClinicContainer>
    </section>
  );
}

export function ClinicDoctors({ clinic }: { clinic: ClinicContent }) {
  if (!clinic.sectionVisibility.doctors || clinic.doctors.length === 0) return null;

  return (
    <section id="doctors" className="bg-white py-16 sm:py-20 lg:py-24">
      <ClinicContainer>
        <ClinicSectionHeading eyebrow="فريقنا الطبي" title="خبرات تهتم بصحتكم" description="تعرّفوا على الفريق الذي يقدم خدمات العيادة." />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {sortByDisplayOrder(clinic.doctors).map((doctor) => (
            <article key={doctor.id} className="overflow-hidden rounded-[1.5rem] border border-sky-100 bg-white shadow-[0_12px_40px_rgba(15,64,84,.08)]">
              <ClinicImageFrame image={doctor.image} fallbackLabel="صورة الطبيب" className="aspect-[4/3]" />
              <div className="p-6">
                <p className="text-sm font-bold text-[var(--clinic-primary)]">{doctor.specialty}</p>
                <h3 className="mt-1 text-xl font-black text-slate-900">{doctor.name}</h3>
                {doctor.yearsOfExperience !== undefined ? <p className="mt-2 text-sm font-bold text-slate-500">خبرة {doctor.yearsOfExperience} سنوات</p> : null}
                {doctor.biography ? <p className="mt-4 text-sm leading-7 text-slate-600">{doctor.biography}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </ClinicContainer>
    </section>
  );
}

export function ClinicTestimonials({ clinic }: { clinic: ClinicContent }) {
  if (!clinic.sectionVisibility.testimonials || clinic.testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="bg-slate-950 py-16 text-white sm:py-20 lg:py-24">
      <ClinicContainer>
        <ClinicSectionHeading eyebrow="تجارب يشاركها المراجعون" title="آراء أضافتها العيادة" description="هذه الآراء يديرها صاحب العيادة وليست مراجعات موثقة من منصة مستقلة." inverse />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sortByDisplayOrder(clinic.testimonials).map((testimonial) => (
            <figure key={testimonial.id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <blockquote className="text-base leading-8 text-slate-200">“{testimonial.text}”</blockquote>
              <figcaption className="mt-5 text-sm font-bold text-sky-300">{testimonial.displayName}</figcaption>
            </figure>
          ))}
        </div>
      </ClinicContainer>
    </section>
  );
}

export function ClinicFaq({ clinic }: { clinic: ClinicContent }) {
  if (!clinic.sectionVisibility.faq || clinic.faq.length === 0) return null;

  return (
    <section id="faq" className="bg-white py-16 sm:py-20 lg:py-24">
      <ClinicContainer className="max-w-4xl">
        <ClinicSectionHeading eyebrow="الأسئلة الشائعة" title="إجابات تساعدكم قبل التواصل" />
        <div className="mt-10 space-y-3">
          {sortByDisplayOrder(clinic.faq).map((entry) => (
            <details key={entry.id} className="group rounded-2xl border border-sky-100 bg-white px-5 shadow-sm open:border-sky-200 open:bg-sky-50/50 sm:px-6">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 font-bold text-slate-900 marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clinic-primary)]">
                <span>{entry.question}</span>
                <span className="text-xl text-[var(--clinic-primary)] transition group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="border-t border-sky-100 pb-5 pt-4 text-sm leading-8 text-slate-600 sm:text-base">{entry.answer}</p>
            </details>
          ))}
        </div>
      </ClinicContainer>
    </section>
  );
}
