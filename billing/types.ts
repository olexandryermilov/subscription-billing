export type BillingCycle = "monthly" | "annual";

export interface BillingPeriod {
  start: Date;
  end: Date;
}

export interface Discount {
  code?: string;
  type: "percent" | "fixed";
  value: number;
}

export interface SubscriptionState {
  planId: string;
  billingCycle: BillingCycle;
  seats: number;
  // price of one seat for one full billing cycle
  pricePerSeat: number;
}

export interface Tenant {
  id: string;
  subscription: SubscriptionState;
  currentCycle: BillingPeriod;
  trialStartedAt: Date | null;
  trialExcludedSeats: number;
  activeDiscount: Discount | null;
}

export interface PlanChange {
  from: SubscriptionState;
  to: SubscriptionState;
  requestedAt: Date;
}

export interface ProrationResult {
  amount: number;
  type: "immediate_charge" | "credit_next_invoice";
}

export interface InvoiceLine {
  description: string;
  amount: number;
}

export interface Invoice {
  tenantId: string;
  period: BillingPeriod;
  lines: InvoiceLine[];
  total: number;
}
