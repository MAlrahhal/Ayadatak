import type { ClinicHeroSlide, ClinicImage } from "@/types/clinic";

export const MIN_HERO_SLIDES = 1;
export const MAX_HERO_SLIDES = 5;

export function getAdjacentHeroSlideIndex(index: number, count: number, direction: -1 | 1): number {
  if (count <= 1) return 0;
  return (index + direction + count) % count;
}

export function addClinicHeroSlide(slides: readonly ClinicHeroSlide[], image: ClinicImage, id: string): ClinicHeroSlide[] {
  if (slides.length >= MAX_HERO_SLIDES || slides.some((slide) => slide.id === id)) return [...slides];
  return [...slides, { id, image: { ...image } }];
}

export function removeClinicHeroSlide(slides: readonly ClinicHeroSlide[], id: string): ClinicHeroSlide[] {
  if (slides.length <= MIN_HERO_SLIDES || !slides.some((slide) => slide.id === id)) return [...slides];
  return slides.filter((slide) => slide.id !== id);
}

export function moveClinicHeroSlide(slides: readonly ClinicHeroSlide[], id: string, direction: -1 | 1): ClinicHeroSlide[] {
  const next = [...slides];
  const index = next.findIndex((slide) => slide.id === id);
  const target = index + direction;
  if (index < 0 || target < 0 || target >= next.length) return next;
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}
