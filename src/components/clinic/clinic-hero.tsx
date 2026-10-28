import type { ClinicContent } from "@/types/clinic";
import { ClinicContainer, clinicFocusClass } from "./clinic-primitives";
import { ClinicHeroSlider } from "./clinic-hero-slider";
import type { ClinicEditorSlots } from "./clinic-editor-slots";

export function ClinicHero({ clinic, showContactAction, editor }: { clinic: ClinicContent; showContactAction: boolean; editor?: ClinicEditorSlots }) {
  const quickLinks = [
    clinic.sectionVisibility.services && clinic.services.length ? { href: "#services", label: "الخدمات" } : null,
    clinic.sectionVisibility.doctors && clinic.doctors.length ? { href: "#doctors", label: "الفريق الطبي" } : null,
    clinic.sectionVisibility.workingHours && clinic.workingHours.length ? { href: "#working-hours", label: "ساعات العمل" } : null,
    showContactAction ? { href: "#contact", label: "الموقع والتواصل" } : null,
  ].filter((item): item is { href: string; label: string } => Boolean(item))
    .map((item, index) => ({ ...item, number: String(index + 1).padStart(2, "0") }));

  return <section id="home" className="bg-white pt-3 sm:pt-5">
    <ClinicContainer>
      <div className="relative isolate min-h-[540px] overflow-hidden rounded-[1.5rem] bg-slate-800 shadow-[0_22px_55px_rgba(12,47,70,.15)] sm:min-h-[520px] sm:rounded-[2rem] lg:min-h-[550px]">
        <ClinicHeroSlider slides={clinic.hero.slides} selectedSlideId={editor?.selectedSlideId} onSelectSlide={editor?.onSelectSlide} />
        {editor ? <div className="absolute left-4 top-4 z-30 sm:left-6 sm:top-6">{editor.edit("heroImage")}</div> : null}
        <div className="pointer-events-none relative z-10 flex min-h-[540px] items-end px-7 pb-20 pt-20 sm:min-h-[520px] sm:items-center sm:px-16 sm:pb-20 lg:min-h-[550px] lg:px-20">
          <div className="pointer-events-auto max-w-[630px] text-white">
            {clinic.identity.tagline ? <p className="inline-flex max-w-full rounded-full border border-white/25 bg-white/15 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm sm:text-sm">{clinic.identity.tagline}</p> : null}
            {editor ? <div className="mt-4">{editor.edit("hero")}</div> : null}
            <h1 className="mt-4 text-[2rem] font-black leading-[1.2] tracking-tight text-white text-balance sm:text-[clamp(2.25rem,4.25vw,4.25rem)]">{clinic.hero.headline}</h1>
            <p className="mt-5 max-w-[560px] text-sm leading-7 text-white/90 sm:text-base sm:leading-8 lg:text-lg">{clinic.hero.description}</p>
            {(showContactAction || (clinic.sectionVisibility.services && clinic.services.length > 0)) ? <div className="mt-7 flex flex-wrap gap-3">
              {showContactAction ? <a href="#contact" className={`inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--clinic-primary)] px-6 text-sm font-bold text-[var(--clinic-on-primary)] shadow-lg transition hover:brightness-110 motion-reduce:transition-none sm:text-base ${clinicFocusClass}`}>تواصل مع العيادة <span aria-hidden="true" className="ms-2">↗</span></a> : null}
              {clinic.sectionVisibility.services && clinic.services.length > 0 ? <a href="#services" className={`inline-flex min-h-12 items-center justify-center rounded-xl border border-white/60 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20 motion-reduce:transition-none sm:text-base ${clinicFocusClass}`}>تعرّف على خدماتنا</a> : null}
            </div> : null}
          </div>
        </div>
      </div>
      {quickLinks.length ? <nav aria-label="روابط سريعة" className="-mt-5 relative z-10 mx-auto grid max-w-5xl grid-cols-2 gap-2 rounded-2xl border border-[var(--clinic-outline)] bg-white p-2 shadow-[0_12px_36px_rgba(12,47,70,.1)] sm:grid-cols-4 sm:gap-1 sm:p-3">
        {quickLinks.map((link) => <a key={link.href} href={link.href} className={`flex min-h-16 items-center justify-between gap-2 rounded-xl px-3 text-sm font-bold text-slate-800 transition hover:bg-[var(--clinic-accent)] hover:text-[var(--clinic-primary-text)] motion-reduce:transition-none sm:px-5 ${clinicFocusClass}`}><span>{link.label}</span><span className="text-xs font-bold text-[var(--clinic-primary-text)]" aria-hidden="true">{link.number}</span></a>)}
      </nav> : null}
    </ClinicContainer>
  </section>;
}
