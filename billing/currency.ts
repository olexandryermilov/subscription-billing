/**
 * Rounds to `decimals` places using banker's rounding (round half to even).
 *
 * Invoice lines and totals go through this function: finance reconciles our ledger
 * against the payment provider's settlement reports, which use half-to-even, so
 * rounding errors don't drift in one direction across many lines.
 */
export function roundMoney(amount: number, decimals = 2): number {
  const factor = 10 ** decimals;
  const scaled = amount * factor;
  const floor = Math.floor(scaled);
  const fraction = scaled - floor;
  const epsilon = 1e-9;

  if (fraction > 0.5 + epsilon) return (floor + 1) / factor;
  if (fraction < 0.5 - epsilon) return floor / factor;
  return (floor % 2 === 0 ? floor : floor + 1) / factor;
}

export function formatMoney(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}
