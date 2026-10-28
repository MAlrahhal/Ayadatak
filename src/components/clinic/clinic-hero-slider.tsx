"use client";

import { useState, type KeyboardEvent } from "react";
import Image from "next/image";
import type { ClinicHeroSlide } from "@/types/clinic";
import { getRenderableImage } from "./clinic-utils";
import { clinicFocusClass } from "./clinic-primitives";
import { getAdjacentHeroSlideIndex } from "@/lib/clinic-hero-slides";

export function ClinicHeroSlider({ slides, selectedSlideId, onSelectSlide }: {
  slides: readonly ClinicHeroSlide[];
  selectedSlideId?: string;
  onSelectSlide?: (id: string) => void;
}) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [failedSource, setFailedSource] = useState("");
  const selectedIndex = selectedSlideId ? slides.findIndex((slide) => slide.id === selectedSlideId) : -1;
  const activeIndex = selectedIndex >= 0 ? selectedIndex : Math.min(internalIndex, Math.max(0, slides.length - 1));
  const slide = slides[activeIndex];
  const image = getRenderableImage(slide?.image);
  const hasImage = Boolean(image && image.src !== failedSource);
  const multiple = slides.length > 1;

  const select = (index: number) => {
    if (!slides.length) return;
    const next = (index + slides.length) % slides.length;
    setInternalIndex(next);
    onSelectSlide?.(slides[next].id);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!multiple) return;
    if (event.key === "ArrowLeft") { event.preventDefault(); select(getAdjacentHeroSlideIndex(activeIndex, slides.length, 1)); }
    if (event.key === "ArrowRight") { event.preventDefault(); select(getAdjacentHeroSlideIndex(activeIndex, slides.length, -1)); }
  };

  return <div className="absolute inset-0" role="region" aria-roledescription="عارض صور" aria-label="صور العيادة" tabIndex={multiple ? 0 : undefined} onKeyDown={handleKeyDown}>
    {hasImage ? <Image key={image!.src} src={image!.src} alt={image!.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 92vw, 1280px" loading={activeIndex === 0 ? "eager" : "lazy"} fetchPriority={activeIndex === 0 ? "high" : undefined} unoptimized={!image!.src.startsWith("/")} className="object-cover object-center" onError={() => setFailedSource(image!.src)} />
      : <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_32%,var(--clinic-accent),#c8e7ef_55%,#719bad)]" aria-label="صورة العيادة غير متاحة" role="img"><div className="absolute inset-x-[12%] bottom-0 h-[50%] rounded-t-[5rem] border-[18px] border-white/25 bg-white/10" /></div>}
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(270deg,rgba(5,28,46,.86)_0%,rgba(5,28,46,.66)_40%,rgba(5,28,46,.12)_100%)] max-sm:bg-[linear-gradient(0deg,rgba(5,28,46,.88)_0%,rgba(5,28,46,.28)_100%)]" />
    {multiple ? <>
      <button type="button" aria-label="الصورة السابقة" onClick={() => select(getAdjacentHeroSlideIndex(activeIndex, slides.length, -1))} className={`absolute right-3 bottom-4 z-20 grid size-11 place-items-center rounded-full border border-white/60 bg-white/90 text-xl text-slate-900 shadow-md transition hover:bg-white sm:right-5 sm:top-1/2 sm:bottom-auto sm:size-10 sm:-translate-y-1/2 ${clinicFocusClass}`}>›</button>
      <button type="button" aria-label="الصورة التالية" onClick={() => select(getAdjacentHeroSlideIndex(activeIndex, slides.length, 1))} className={`absolute left-3 bottom-4 z-20 grid size-11 place-items-center rounded-full border border-white/60 bg-white/90 text-xl text-slate-900 shadow-md transition hover:bg-white sm:left-5 sm:top-1/2 sm:bottom-auto sm:size-10 sm:-translate-y-1/2 ${clinicFocusClass}`}>‹</button>
      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex justify-center gap-2 sm:bottom-4" aria-label="انتقال صور العيادة">
        {slides.map((item, index) => <button key={item.id} type="button" onClick={() => select(index)} aria-label={`اعرض الصورة ${index + 1} من ${slides.length}`} aria-current={index === activeIndex ? "true" : undefined} className={`pointer-events-auto h-2.5 rounded-full transition-[width,background-color] motion-reduce:transition-none ${index === activeIndex ? "w-7 bg-white" : "w-2.5 bg-white/60 hover:bg-white"} ${clinicFocusClass}`} />)}
      </div>
    </> : null}
  </div>;
}
