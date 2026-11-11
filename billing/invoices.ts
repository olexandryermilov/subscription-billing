import { roundMoney } from "./currency";
import { applyDiscount } from "./discounts";
import type { Invoice, InvoiceLine, Tenant } from "./types";

export function buildRenewalInvoice(tenant: Tenant, extraLines: InvoiceLine[] = []): Invoice {
  const { seats, pricePerSeat, planId, billingCycle } = tenant.subscription;
  const base = applyDiscount(seats * pricePerSeat, tenant.activeDiscount);

  const lines: InvoiceLine[] = [
    { description: `${planId} plan, ${seats} seats (${billingCycle})`, amount: roundMoney(base) },
    ...extraLines.map((line) => ({ ...line, amount: roundMoney(line.amount) })),
  ];

  return {
    tenantId: tenant.id,
    period: tenant.currentCycle,
    lines,
    total: roundMoney(lines.reduce((sum, line) => sum + line.amount, 0)),
  };
}
