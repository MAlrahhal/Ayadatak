import type { ClinicIdentity } from "@/types/clinic";
import { ClinicContainer, clinicFocusClass } from "./clinic-primitives";
import { ClinicLogo } from "./clinic-logo";
import type { ClinicNavigationItem } from "./clinic-utils";
import type { ClinicEditorSlots } from "./clinic-editor-slots";

export function ClinicHeader({ identity, navigation, showContactAction, editor }: {
  identity: ClinicIdentity;
  navigation: readonly ClinicNavigationItem[];
  showContactAction: boolean;
  editor?: ClinicEditorSlots;
}) {
  return <header className="relative z-40 border-b border-[var(--clinic-outline)] bg-white">
    <ClinicContainer className="flex min-h-[78px] items-center justify-between gap-3 py-3">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <a href="#home" className={`flex min-w-0 items-center gap-3 rounded-lg ${clinicFocusClass}`}>
          <ClinicLogo image={identity.logo} className="size-12 sm:size-14" />
          <span className="min-w-0"><span className="block truncate text-base font-black text-[#102B41] sm:text-lg">{identity.nameAr}</span>{identity.tagline ? <span className="block truncate text-[11px] text-slate-500 sm:text-xs">{identity.tagline}</span> : null}</span>
        </a>
        {editor ? <div className="flex shrink-0 gap-1 [&_button_span]:hidden">{editor.edit("identity")}{editor.edit("logo")}</div> : null}
      </div>

      <nav className="hidden items-center gap-0.5 xl:flex" aria-label="التنقل الرئيسي">
        {navigation.map((item) => <a key={item.href} href={item.href} className={`relative rounded-lg px-2.5 py-3 text-[13px] font-bold transition-colors hover:bg-[var(--clinic-accent)] hover:text-[var(--clinic-primary-text)] ${item.href === "#home" ? "text-[var(--clinic-primary-text)] after:absolute after:inset-x-2 after:bottom-1 after:h-0.5 after:rounded-full after:bg-[var(--clinic-primary)]" : "text-slate-600"} ${clinicFocusClass}`}>{item.label}</a>)}
      </nav>

      <div className="flex shrink-0 items-center gap-2">
        {showContactAction ? <a href="#contact" className={`hidden min-h-11 items-center rounded-xl bg-[var(--clinic-primary)] px-5 text-sm font-bold text-[var(--clinic-on-primary)] shadow-sm transition hover:brightness-110 sm:inline-flex ${clinicFocusClass}`}>تواصل معنا</a> : null}
        <details className="relative xl:hidden">
          <summary className={`grid size-11 cursor-pointer list-none place-items-center rounded-xl border border-[var(--clinic-outline)] bg-white text-[#102B41] marker:hidden ${clinicFocusClass}`} aria-label="فتح قائمة التنقل"><span aria-hidden="true" className="text-xl leading-none">☰</span></summary>
          <nav className="absolute left-0 top-14 z-50 w-[min(270px,calc(100vw-32px))] rounded-2xl border border-[var(--clinic-outline)] bg-white p-2 shadow-xl" aria-label="التنقل للجوال">
            {navigation.map((item) => <a key={item.href} href={item.href} className={`block rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-[var(--clinic-accent)] hover:text-[var(--clinic-primary-text)] ${clinicFocusClass}`}>{item.label}</a>)}
          </nav>
        </details>
      </div>
    </ClinicContainer>
  </header>;
}
