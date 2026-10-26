import type { SVGProps } from "react";

export type IconName =
  | "arrow-left"
  | "building"
  | "check"
  | "chevron-down"
  | "clipboard"
  | "code"
  | "dashboard"
  | "device"
  | "edit"
  | "eye"
  | "file"
  | "globe"
  | "heart"
  | "image"
  | "language"
  | "menu"
  | "people"
  | "play"
  | "search"
  | "settings"
  | "shield"
  | "spark"
  | "stethoscope"
  | "template"
  | "tooth";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
  };

  const paths: Record<IconName, React.ReactNode> = {
    "arrow-left": <path d="m15 18-6-6 6-6M9 12h10" />,
    building: <path d="M4 21h16M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M9 7h2m2 0h2M9 11h2m2 0h2M9 15h2m2 0h2" />,
    check: <path d="m5 12 4 4L19 6" />,
    "chevron-down": <path d="m6 9 6 6 6-6" />,
    clipboard: <path d="M9 5h6m-6 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 0H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 12h6m-6 4h4" />,
    code: <path d="m8 9-3 3 3 3m8-6 3 3-3 3m-2-9-4 12" />,
    dashboard: <path d="M4 13h6V4H4v9Zm10 7h6v-9h-6v9ZM4 20h6v-3H4v3Zm10-13h6V4h-6v3Z" />,
    device: <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm3 17h4" />,
    edit: <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z" />,
    eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" /></>,
    file: <path d="M6 2h8l4 4v16H6V2Zm8 0v5h5M9 12h6m-6 4h6" />,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.3 3 14.7 0 18M12 3c-3 3.3-3 14.7 0 18" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8.5" cy="9" r="1.5" /><path d="m21 15-5-5L5 20" /></>,
    language: <><path d="M4 5h7M7.5 3v2m-2 0c.5 3 2.5 5.5 5.5 7M10 5c-.5 3-2.5 5.5-6 7" /><path d="m13 21 4-10 4 10m-6.5-4h5" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    people: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
    play: <path d="m9 7 8 5-8 5V7Z" />,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H3v-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V3h4v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Zm-3-10 2 2 4-4" />,
    spark: <path d="m12 3 1.4 4.1L17.5 8l-4.1 1.4L12 13.5l-1.4-4.1L6.5 8l4.1-.9L12 3Zm6 10 .8 2.2L21 16l-2.2.8L18 19l-.8-2.2L15 16l2.2-.8L18 13ZM6 14l1 2.8L10 18l-3 1.2L6 22l-1-2.8L2 18l3-1.2L6 14Z" />,
    stethoscope: <path d="M6 3v5a4 4 0 0 0 8 0V3M4 3h4m4 0h4m-6 9v2a5 5 0 0 0 10 0v-1m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />,
    template: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M9 9v11" /></>,
    tooth: <path d="M12 4c-2-2-6-1-7 2-1 4 2 5 2 10 0 3 1 5 2 5 2 0 1-6 3-6s1 6 3 6c1 0 2-2 2-5 0-5 3-6 2-10-1-3-5-4-7-2Z" />,
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...common} {...props}>
      {paths[name]}
    </svg>
  );
}
