import type { ReactNode } from "react";

export function ClinicContainer({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function ClinicSectionHeading({ eyebrow, title, description, inverse = false }: {
  eyebrow: string; title: string; description?: string; inverse?: boolean;
}) {
  return <div className="mx-auto max-w-[690px] text-center">
    <p className={`text-xs font-extrabold tracking-wide sm:text-sm ${inverse ? "text-white/80" : "text-[var(--clinic-primary-text)]"}`}>{eyebrow}</p>
    <h2 className={`mt-2 text-[clamp(1.65rem,2.8vw,2.65rem)] font-black leading-[1.35] tracking-tight text-balance ${inverse ? "text-white" : "text-[#102B41]"}`}>{title}</h2>
    {description ? <p className={`mt-3 text-sm leading-7 sm:text-base ${inverse ? "text-white/75" : "text-slate-600"}`}>{description}</p> : null}
  </div>;
}

export const clinicFocusClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clinic-primary-text)] focus-visible:ring-offset-2";
