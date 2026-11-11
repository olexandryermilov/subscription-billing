import type { Tenant } from "./types";

export const TRIAL_DAYS = 14;

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function trialEndsAt(tenant: Tenant): Date | null {
  if (!tenant.trialStartedAt) return null;
  return new Date(tenant.trialStartedAt.getTime() + TRIAL_DAYS * MS_PER_DAY);
}

export function isInTrial(tenant: Tenant, at: Date = new Date()): boolean {
  const end = trialEndsAt(tenant);
  return end !== null && at < end;
}

/** True when a seat added at `addedAt` falls inside the tenant's trial window. */
export function isTrialSeat(tenant: Tenant, addedAt: Date): boolean {
  const end = trialEndsAt(tenant);
  return end !== null && tenant.trialStartedAt !== null && addedAt >= tenant.trialStartedAt && addedAt < end;
}
