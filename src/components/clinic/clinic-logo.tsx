"use client";

import { useState } from "react";
import Image from "next/image";
import type { ClinicImage } from "@/types/clinic";
import { getRenderableImage } from "./clinic-utils";

export function ClinicLogo({ image, className = "size-12" }: { image?: ClinicImage; className?: string }) {
  const logo = getRenderableImage(image);
  const [failedSource, setFailedSource] = useState("");
  return <span className={`relative grid shrink-0 place-items-center overflow-hidden rounded-2xl bg-[var(--clinic-accent)] text-[var(--clinic-primary-text)] ${className}`}>
    {logo && logo.src !== failedSource ? <Image key={logo.src} src={logo.src} alt={logo.alt} fill sizes="64px" unoptimized={!logo.src.startsWith("/")} className="object-contain" onError={() => setFailedSource(logo.src)} />
      : <span className="text-2xl font-bold" aria-label="رمز طبي للعيادة" role="img">✚</span>}
  </span>;
}
