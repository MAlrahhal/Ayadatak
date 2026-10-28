"use client";

import { useState } from "react";
import Image from "next/image";
import type { ClinicImage } from "@/types/clinic";
import { getRenderableImage } from "./clinic-utils";

export function ClinicImageFrame({ image, className = "", fallbackLabel, sizes = "(max-width: 640px) 100vw, 50vw" }: {
  image?: ClinicImage; className?: string; fallbackLabel: string; sizes?: string;
}) {
  const renderable = getRenderableImage(image);
  const [failedSource, setFailedSource] = useState("");

  return <div className={`relative overflow-hidden bg-[linear-gradient(145deg,var(--clinic-accent),#eef6f8_58%,#e2edf2)] ${className}`}>
    {renderable && renderable.src !== failedSource ? <Image key={renderable.src} src={renderable.src} alt={renderable.alt} fill sizes={sizes} unoptimized={!renderable.src.startsWith("/")} className="object-cover" onError={() => setFailedSource(renderable.src)} />
      : <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center"><span aria-hidden="true" className="grid size-12 place-items-center rounded-2xl border border-white/80 bg-white/70 text-xl text-[var(--clinic-primary-text)]">✚</span><span className="max-w-[80%] text-xs font-semibold text-slate-600">{fallbackLabel}</span></div>}
  </div>;
}
