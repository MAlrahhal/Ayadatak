import type { CSSProperties } from "react";

export const DEFAULT_CLINIC_PRIMARY = "#0B67AD";
export const CLINIC_COLOR_PRESETS = [
  "#0B67AD", "#087F9C", "#0F766E", "#6743A8", "#A62764", "#A64F27",
] as const;

type Rgb = [number, number, number];

function parseHex(value: string): Rgb | null {
  if (!/^#[0-9a-f]{6}$/i.test(value)) return null;
  return [1, 3, 5].map((index) => parseInt(value.slice(index, index + 2), 16)) as Rgb;
}

function toHex(rgb: Rgb): string {
  return `#${rgb.map((channel) => Math.round(channel).toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

function blend(from: Rgb, to: Rgb, portion: number): Rgb {
  return from.map((value, index) => value * (1 - portion) + to[index] * portion) as Rgb;
}

function luminance(rgb: Rgb): number {
  const [red, green, blue] = rgb.map((value) => {
    const channel = value / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrast(first: Rgb, second: Rgb): number {
  const values = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

export function getClinicTheme(primaryValue?: string): CSSProperties {
  const primary = parseHex(primaryValue ?? "") ?? parseHex(DEFAULT_CLINIC_PRIMARY)!;
  const white: Rgb = [255, 255, 255];
  const navy: Rgb = [9, 32, 51];
  let ink = primary;
  while (contrast(ink, white) < 4.5) ink = blend(ink, navy, 0.15);

  return {
    "--clinic-primary": toHex(primary),
    "--clinic-primary-text": toHex(ink),
    "--clinic-on-primary": contrast(primary, white) >= contrast(primary, navy) ? "#FFFFFF" : toHex(navy),
    "--clinic-accent": toHex(blend(primary, white, 0.9)),
    "--clinic-outline": toHex(blend(primary, white, 0.74)),
  } as CSSProperties;
}
