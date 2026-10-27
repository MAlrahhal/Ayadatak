import type { CSSProperties, ReactNode } from "react";
import type { ClinicImage } from "@/types/clinic";
import { getRenderableImage } from "./clinic-utils";

export function ClinicContainer({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1180px] px-5 sm:px-7 lg:px-10 ${className}`}>{children}</div>;
}

export function ClinicSectionHeading({
  eyebrow,
  title,
  description,
  inverse = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  inverse?: boolean;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-bold text-[var(--clinic-primary)]">{eyebrow}</p>
      <h2 className={`mt-2 text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl ${inverse ? "text-white" : "text-slate-900"}`}>{title}</h2>
      {description ? <p className={`mt-4 text-sm leading-7 sm:text-base ${inverse ? "text-slate-300" : "text-slate-600"}`}>{description}</p> : null}
    </div>
  );
}

export function ClinicImageFrame({
  image,
  className = "",
  fallbackLabel,
}: {
  image?: ClinicImage;
  className?: string;
  fallbackLabel: string;
}) {
  const renderableImage = getRenderableImage(image);
  const style = renderableImage
    ? ({ backgroundImage: `url(${JSON.stringify(renderableImage.src)})` } satisfies CSSProperties)
    : undefined;

  return (
    <div
      role={renderableImage ? "img" : undefined}
      aria-label={renderableImage?.alt}
      className={`relative overflow-hidden bg-gradient-to-br from-sky-100 via-white to-cyan-50 ${renderableImage ? "bg-cover bg-center" : ""} ${className}`}
      style={style}
    >
      {!renderableImage ? (
        <div className="absolute inset-0 grid place-items-center p-6 text-center">
          <div>
            <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-white text-2xl font-black text-[var(--clinic-primary)] shadow-sm" aria-hidden="true">✚</span>
            <p className="mt-4 text-sm font-bold text-slate-500">{fallbackLabel}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export const clinicFocusClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clinic-primary)] focus-visible:ring-offset-2";
