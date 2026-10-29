export const GRACE_PERIOD_MS = 7 * 24 * 60 * 60 * 1_000;

export type EntitlementWindow = {
  startsAt: Date;
  endsAt: Date;
  accessExtendedUntil: Date | null;
};

export type PublicAccessState = "active" | "grace" | "extended" | "expired" | "not-started" | "suspended" | "missing";

/** All deadlines are exclusive UTC instants; suspension wins before timing. */
export function evaluatePublicAccess(
  operationalState: "ACTIVE" | "SUSPENDED",
  entitlement: EntitlementWindow | null,
  now: Date,
): PublicAccessState {
  if (operationalState === "SUSPENDED") return "suspended";
  if (!entitlement) return "missing";
  const instant = now.getTime();
  const start = entitlement.startsAt.getTime();
  const end = entitlement.endsAt.getTime();
  const extension = entitlement.accessExtendedUntil?.getTime() ?? -Infinity;
  if (![instant, start, end].every(Number.isFinite) || end <= start || !Number.isFinite(extension) && extension !== -Infinity)
    return "missing";
  if (instant < start) return "not-started";
  if (instant < end) return "active";
  if (instant < end + GRACE_PERIOD_MS) return "grace";
  if (instant < extension) return "extended";
  return "expired";
}

export function permitsPublicRead(state: PublicAccessState): boolean {
  return state === "active" || state === "grace" || state === "extended";
}
