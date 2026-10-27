import type { CSSProperties } from "react";
import type { ClinicIdentity } from "@/types/clinic";
import { ClinicContainer, clinicFocusClass } from "./clinic-primitives";
import { getRenderableImage, type ClinicNavigationItem } from "./clinic-utils";

export function ClinicHeader({
  identity,
  navigation,
  showContactAction,
}: {
  identity: ClinicIdentity;
  navigation: readonly ClinicNavigationItem[];
  showContactAction: boolean;
}) {
  const logo = getRenderableImage(identity.logo);
  const logoStyle = logo
    ? ({ backgroundImage: `url(${JSON.stringify(logo.src)})` } satisfies CSSProperties)
    : undefined;

  return (
    <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
      <ClinicContainer className="flex min-h-18 items-center justify-between gap-4 py-3">
        <a href="#home" className={`flex min-w-0 items-center gap-3 rounded-lg ${clinicFocusClass}`}>
          <span
            role={logo ? "img" : undefined}
            aria-label={logo?.alt}
            className={`grid size-11 shrink-0 place-items-center rounded-xl bg-[var(--clinic-accent)] text-lg font-black text-[var(--clinic-primary)] ${logo ? "bg-cover bg-center" : ""}`}
            style={logoStyle}
          >
            {logo ? null : <span aria-hidden="true">✚</span>}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-black text-slate-900 sm:text-lg">{identity.nameAr}</span>
            {identity.tagline ? <span className="block truncate text-xs text-slate-500">{identity.tagline}</span> : null}
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="التنقل الرئيسي">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className={`rounded-lg px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-sky-50 hover:text-[var(--clinic-primary)] ${clinicFocusClass}`}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {showContactAction ? (
            <a href="#contact" className={`hidden min-h-11 items-center rounded-xl bg-[var(--clinic-primary)] px-5 text-sm font-bold text-white shadow-sm transition hover:brightness-95 sm:inline-flex ${clinicFocusClass}`}>
              تواصل معنا
            </a>
          ) : null}
          <details className="relative lg:hidden">
            <summary className={`grid size-11 cursor-pointer list-none place-items-center rounded-xl border border-sky-200 bg-white text-slate-700 marker:hidden ${clinicFocusClass}`} aria-label="فتح قائمة التنقل">
              <span aria-hidden="true" className="text-xl leading-none">☰</span>
            </summary>
            <nav className="absolute left-0 top-14 w-64 rounded-2xl border border-sky-100 bg-white p-2 shadow-xl" aria-label="التنقل للجوال">
              {navigation.map((item) => (
                <a key={item.href} href={item.href} className={`block rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-sky-50 ${clinicFocusClass}`}>
                  {item.label}
                </a>
              ))}
            </nav>
          </details>
        </div>
      </ClinicContainer>
    </header>
  );
}
