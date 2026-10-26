import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-hover shadow-[0_10px_25px_rgba(8,159,197,.2)]",
  secondary:
    "bg-white text-foreground border border-primary/30 hover:border-primary hover:bg-primary/5 active:bg-primary/5 shadow-sm",
  ghost: "text-foreground hover:bg-surface-muted active:bg-surface-muted",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-sm sm:text-base gap-2.5",
};

export function getButtonClassName({
  variant = "primary",
  size = "md",
  className = "",
}: ButtonStyleOptions = {}): string {
  return `inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-lg font-bold transition-[background-color,border-color,color,box-shadow,transform] duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={getButtonClassName({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  );
}
