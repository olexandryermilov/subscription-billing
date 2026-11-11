import type { Discount } from "./types";

/**
 * Applies the account discount to an amount. Works for charges and credits alike:
 * a fixed discount shrinks the absolute value and never flips the sign.
 */
export function applyDiscount(amount: number, discount: Discount | null): number {
  if (!discount) return amount;

  if (discount.type === "percent") {
    return amount * (1 - discount.value / 100);
  }

  const reduced = Math.max(0, Math.abs(amount) - discount.value);
  return Math.sign(amount) * reduced;
}
