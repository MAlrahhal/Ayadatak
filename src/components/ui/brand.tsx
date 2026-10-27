import type { HTMLAttributes } from "react";

export interface BrandProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export function BrandIcon({
  className = "size-9 rounded-[11px] shadow-[0_8px_20px_rgba(8,159,197,.22)]",
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={`grid place-items-center bg-primary text-white ${className}`} {...props}>
      <svg viewBox="0 0 32 32" className="size-7" fill="none" aria-hidden="true">
        <path d="M7 17.5c3.8 4.8 9.5 6.2 14.2 2.8 1.8-1.3 3-3.1 3.8-5.3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M8 10.5h16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity=".9" />
      </svg>
    </span>
  );
}

export function Brand({ className = "", ...props }: BrandProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xl font-black tracking-tight text-foreground select-none ${className}`}
      {...props}
    >
      <BrandIcon aria-hidden="true" />
      عيادتك
    </span>
  );
}
