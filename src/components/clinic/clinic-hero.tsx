import type { ClinicContent } from "@/types/clinic";
import { ClinicContainer, ClinicImageFrame, clinicFocusClass } from "./clinic-primitives";
import type { ClinicEditorSlots } from "./clinic-editor-slots";

export function ClinicHero({ clinic, showContactAction, editor }: { clinic: ClinicContent; showContactAction: boolean; editor?: ClinicEditorSlots }) {
  const primarySlide = clinic.hero.slides[0];
  const showServicesAction = clinic.sectionVisibility.services && clinic.services.length > 0;

  return (
    <section id="home" className="relative overflow-hidden bg-[linear-gradient(145deg,#f0faff_0%,#ffffff_52%,var(--clinic-accent)_145%)] py-12 sm:py-16 lg:py-24">
      <div className="pointer-events-none absolute -right-24 top-12 size-72 rounded-full bg-[var(--clinic-accent)] opacity-60 blur-3xl" aria-hidden="true" />
      <ClinicContainer className="relative grid items-center gap-10 lg:grid-cols-[1.02fr_.98fr] lg:gap-16">
        <div>
          {editor ? <div className="mb-3">{editor.edit("hero")}</div> : null}
          {clinic.identity.tagline ? (
            <p className="inline-flex rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-[var(--clinic-primary)] shadow-sm">{clinic.identity.tagline}</p>
          ) : null}
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.25] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">{clinic.hero.headline}</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">{clinic.hero.description}</p>
          {showContactAction || showServicesAction ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {showContactAction ? <a href="#contact" className={`inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--clinic-primary)] px-6 text-base font-bold text-white shadow-[0_12px_30px_rgba(8,127,156,.22)] transition hover:-translate-y-0.5 hover:brightness-95 ${clinicFocusClass}`}>تواصل مع العيادة</a> : null}
              {showServicesAction ? <a href="#services" className={`inline-flex min-h-12 items-center justify-center rounded-xl border border-sky-200 bg-white px-6 text-base font-bold text-slate-700 transition hover:border-[var(--clinic-primary)] hover:text-[var(--clinic-primary)] ${clinicFocusClass}`}>تعرّف على خدماتنا</a> : null}
            </div>
          ) : null}
        </div>
        <div className="relative mx-auto w-full max-w-xl">
          {editor ? <div className="absolute left-4 top-4 z-10">{editor.edit("heroImage")}</div> : null}
          <div className="absolute -inset-3 rotate-2 rounded-[2rem] bg-[var(--clinic-primary)] opacity-10" aria-hidden="true" />
          <ClinicImageFrame image={primarySlide?.image} fallbackLabel="صورة العيادة" className="aspect-[4/3] rounded-[1.75rem] border-8 border-white shadow-[0_28px_70px_rgba(15,64,84,.18)]" />
          <div className="absolute -bottom-5 right-5 rounded-2xl border border-sky-100 bg-white px-5 py-4 shadow-xl sm:right-8">
            <p className="text-xs font-bold text-slate-500">مرحبًا بكم في</p>
            <p className="mt-1 font-black text-slate-900">{clinic.identity.nameAr}</p>
          </div>
        </div>
      </ClinicContainer>
    </section>
  );
}
