import type { HTMLAttributes } from "react";

export interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function SectionHeading({
  title,
  description,
  as: Component = "h2",
  className = "",
  ...props
}: SectionHeadingProps) {
  return (
    <div className={`space-y-3 ${className}`} {...props}>
      <Component className="text-2xl font-black tracking-[-0.02em] text-foreground sm:text-3xl lg:text-[2.15rem] lg:leading-[1.35]">
        {title}
      </Component>
      {description ? (
        <p className="text-sm leading-7 text-foreground-muted sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
