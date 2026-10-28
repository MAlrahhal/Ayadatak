import type { ClinicContent } from "@/types/clinic";
import { ClinicContainer, clinicFocusClass } from "./clinic-primitives";
import { ClinicLogo } from "./clinic-logo";
import type { ClinicNavigationItem } from "./clinic-utils";

export function ClinicFooter({ clinic, navigation }: { clinic: ClinicContent; navigation: readonly ClinicNavigationItem[] }) {
  return (
    <footer className="bg-[#0d2537] py-10 text-white sm:py-12">
      <ClinicContainer>
        <div className="grid gap-8 border-b border-white/10 pb-8 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <div className="flex items-center gap-3">
              <ClinicLogo image={clinic.identity.logo} className="size-11" />
              <div><p className="text-lg font-black">{clinic.identity.nameAr}</p>{clinic.identity.tagline ? <p className="mt-1 text-sm text-slate-400">{clinic.identity.tagline}</p> : null}</div>
            </div>
            {clinic.sectionVisibility.contact ? <p className="mt-4 text-sm font-bold text-slate-300" dir="ltr">{clinic.contact.phone}</p> : null}
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-3" aria-label="روابط أسفل الصفحة">
            {navigation.map((item) => <a key={item.href} href={item.href} className={`text-sm font-bold text-slate-300 hover:text-white ${clinicFocusClass}`}>{item.label}</a>)}
          </nav>
        </div>
        <p className="pt-6 text-sm text-slate-500">جميع المعلومات المعروضة مقدمة من العيادة.</p>
      </ClinicContainer>
    </footer>
  );
}
