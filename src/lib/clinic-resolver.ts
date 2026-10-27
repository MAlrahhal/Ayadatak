import { demoClinic } from "../data/demo-clinic";
import { sakeenaDemoClinic } from "../data/sakeena-demo-clinic";
import type { ClinicContent } from "../types/clinic";

export const RESERVED_CLINIC_SLUGS = [
  "admin",
  "app",
  "api",
  "dashboard",
  "billing",
  "auth",
  "mail",
  "static",
  "help",
  "www",
] as const;

const reservedClinicSlugs = new Set<string>(RESERVED_CLINIC_SLUGS);
const clinicSlugPattern = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;
const fixtureClinics = [demoClinic, sakeenaDemoClinic] satisfies readonly ClinicContent[];
const fixtureClinicsBySlug = new Map(fixtureClinics.map((clinic) => [clinic.identity.slug, clinic]));

export type ClinicResolutionFailureReason = "invalid" | "reserved" | "not-found";

export type ClinicResolutionResult =
  | { ok: true; slug: string; clinic: ClinicContent }
  | { ok: false; slug: string | null; reason: ClinicResolutionFailureReason };

/**
 * Public clinic lookup boundary. A database-backed implementation can replace this
 * fixture resolver later without coupling the clinic template to persistence.
 * This interface is not an authorization boundary; production tenant isolation
 * must be enforced by authenticated server access and database policies.
 */
export interface ClinicResolver {
  resolveBySlug(slug: string): Promise<ClinicResolutionResult>;
}

export function normalizeClinicSlug(value: string): string | null {
  const normalized = value.trim().toLowerCase();
  return clinicSlugPattern.test(normalized) ? normalized : null;
}

export function isReservedClinicSlug(value: string): boolean {
  const normalized = normalizeClinicSlug(value);
  return normalized !== null && reservedClinicSlugs.has(normalized);
}

function cloneClinicContent(clinic: ClinicContent): ClinicContent {
  return structuredClone(clinic);
}

export const fixtureClinicResolver: ClinicResolver = {
  async resolveBySlug(value) {
    const slug = normalizeClinicSlug(value);

    if (!slug) {
      return { ok: false, slug: null, reason: "invalid" };
    }

    if (reservedClinicSlugs.has(slug)) {
      return { ok: false, slug, reason: "reserved" };
    }

    const clinic = fixtureClinicsBySlug.get(slug);
    if (!clinic) {
      return { ok: false, slug, reason: "not-found" };
    }

    return { ok: true, slug, clinic: cloneClinicContent(clinic) };
  },
};

export function resolveClinicBySlug(slug: string): Promise<ClinicResolutionResult> {
  return fixtureClinicResolver.resolveBySlug(slug);
}

export function getFixtureClinicSlugs(): string[] {
  return [...fixtureClinicsBySlug.keys()];
}
