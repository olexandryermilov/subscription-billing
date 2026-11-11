import { TenantNotFoundError } from "./errors";
import type { Tenant } from "./types";

interface TenantRow {
  id: string;
  plan_id: string;
  billing_cycle: "monthly" | "annual";
  seats: number;
  price_per_seat: number;
  cycle_start: string;
  cycle_end: string;
  trial_started_at: string | null;
  trial_seats: number | null;
  discount_code: string | null;
  discount_percent: number | null;
}

const rows: TenantRow[] = [
  {
    id: "t_orbit",
    plan_id: "team",
    billing_cycle: "monthly",
    seats: 12,
    price_per_seat: 15,
    cycle_start: "2026-11-01",
    cycle_end: "2026-12-01",
    trial_started_at: null,
    trial_seats: null,
    discount_code: null,
    discount_percent: null,
  },
  {
    id: "t_lumen",
    plan_id: "business",
    billing_cycle: "annual",
    seats: 40,
    price_per_seat: 300,
    cycle_start: "2026-03-15",
    cycle_end: "2027-03-15",
    trial_started_at: "2026-03-01",
    trial_seats: 5,
    discount_code: "LAUNCH20",
    discount_percent: 20,
  },
];

export function loadTenant(tenantId: string): Tenant {
  const row = rows.find((r) => r.id === tenantId);
  if (!row) throw new TenantNotFoundError(tenantId);

  return {
    id: row.id,
    subscription: {
      planId: row.plan_id,
      billingCycle: row.billing_cycle,
      seats: row.seats,
      pricePerSeat: row.price_per_seat,
    },
    currentCycle: { start: new Date(row.cycle_start), end: new Date(row.cycle_end) },
    trialStartedAt: row.trial_started_at ? new Date(row.trial_started_at) : null,
    trialExcludedSeats: row.trial_seats ?? 0,
    activeDiscount:
      row.discount_percent !== null
        ? { code: row.discount_code ?? undefined, type: "percent", value: row.discount_percent }
        : null,
  };
}
