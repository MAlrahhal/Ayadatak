import type { CSSProperties } from "react";
import type { ClinicTemplateProps } from "@/types/clinic";
import { ClinicContactSection } from "./clinic-contact";
import { ClinicFooter } from "./clinic-footer";
import { ClinicHeader } from "./clinic-header";
import { ClinicHero } from "./clinic-hero";
import { ClinicAbout, ClinicDoctors, ClinicFaq, ClinicServices, ClinicTestimonials } from "./clinic-sections";
import { getClinicNavigation, getRenderableClinicSections, hasClinicContactSection } from "./clinic-utils";

type ClinicTemplateViewProps = ClinicTemplateProps & {
  previewMode?: boolean;
};

export function ClinicTemplate({ clinic, previewMode = false }: ClinicTemplateViewProps) {
  const navigation = getClinicNavigation(clinic);
  const sections = getRenderableClinicSections(clinic);
  const showContactAction = hasClinicContactSection(clinic);
  const clinicStyle = {
    "--clinic-primary": clinic.identity.brandColors?.primary ?? "#087F9C",
    "--clinic-accent": clinic.identity.brandColors?.accent ?? "#D8F3F7",
  } as CSSProperties;

  return (
    <div className="min-h-screen bg-white text-slate-950" style={clinicStyle}>
      {previewMode ? (
        <div role="status" className="bg-amber-50 px-4 py-2 text-center text-xs font-bold leading-6 text-amber-900 sm:text-sm">
          معاينة تجريبية خيالية — بيانات التواصل والروابط الخارجية معطّلة.
        </div>
      ) : null}
      <ClinicHeader identity={clinic.identity} navigation={navigation} showContactAction={showContactAction} />
      <main>
        <ClinicHero clinic={clinic} showContactAction={showContactAction} />
        {sections.map((section) => {
          switch (section) {
            case "hero":
              return null;
            case "about":
              return <ClinicAbout key={section} clinic={clinic} />;
            case "services":
              return <ClinicServices key={section} clinic={clinic} />;
            case "doctors":
              return <ClinicDoctors key={section} clinic={clinic} />;
            case "testimonials":
              return <ClinicTestimonials key={section} clinic={clinic} />;
            case "faq":
              return <ClinicFaq key={section} clinic={clinic} />;
            case "location-contact":
              return <ClinicContactSection key={section} clinic={clinic} previewMode={previewMode} />;
          }
        })}
      </main>
      <ClinicFooter clinic={clinic} navigation={navigation} />
    </div>
  );
}
