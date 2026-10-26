import type { HTMLAttributes, ReactNode } from "react";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
}

export function Section({ children, className = "", ...props }: SectionProps) {
  return (
    <section
      className={`scroll-mt-16 py-12 sm:py-16 lg:py-20 ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
