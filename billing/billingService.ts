import { InvalidSeatCountError } from "./errors";
import { buildRenewalInvoice } from "./invoices";
import { loadTenant } from "./tenants";
import type { Invoice, PlanChange, SubscriptionState } from "./types";

export class BillingService {
  renewalInvoice(tenantId: string): Invoice {
    return buildRenewalInvoice(loadTenant(tenantId));
  }

  /** Builds the change request for a seat or plan change. Proration is not applied yet. */
  requestChange(tenantId: string, to: SubscriptionState, requestedAt: Date = new Date()): PlanChange {
    if (!Number.isInteger(to.seats) || to.seats < 1) throw new InvalidSeatCountError(to.seats);

    const tenant = loadTenant(tenantId);
    return { from: tenant.subscription, to, requestedAt };
  }
}
