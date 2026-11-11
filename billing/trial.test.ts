import { isInTrial, isTrialSeat, trialEndsAt } from "./trial";
import type { Tenant } from "./types";

function tenant(trialStartedAt: Date | null): Tenant {
  return {
    id: "t_test",
    subscription: { planId: "team", billingCycle: "monthly", seats: 5, pricePerSeat: 15 },
    currentCycle: { start: new Date("2026-11-01"), end: new Date("2026-12-01") },
    trialStartedAt,
    trialExcludedSeats: 0,
    activeDiscount: null,
  };
}

describe("trial", () => {
  const started = new Date("2026-11-01T00:00:00Z");

  it("ends 14 days after start", () => {
    expect(trialEndsAt(tenant(started))).toEqual(new Date("2026-11-15T00:00:00Z"));
  });

  it("has no end without a trial", () => {
    expect(trialEndsAt(tenant(null))).toBeNull();
  });

  it("is in trial only inside the window", () => {
    expect(isInTrial(tenant(started), new Date("2026-11-10T00:00:00Z"))).toBe(true);
    expect(isInTrial(tenant(started), new Date("2026-11-15T00:00:00Z"))).toBe(false);
    expect(isInTrial(tenant(null), new Date("2026-11-10T00:00:00Z"))).toBe(false);
  });

  it("classifies seats by when they were added", () => {
    expect(isTrialSeat(tenant(started), new Date("2026-11-03T00:00:00Z"))).toBe(true);
    expect(isTrialSeat(tenant(started), new Date("2026-11-20T00:00:00Z"))).toBe(false);
  });
});
