import type { PlanChange, ProrationResult, Tenant } from "./types";

export function calculateProration(change: PlanChange, tenant: Tenant): ProrationResult {
  throw new Error("calculateProration is not implemented");
}
