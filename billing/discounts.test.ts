import { applyDiscount } from "./discounts";

describe("applyDiscount", () => {
  it("returns the amount unchanged without a discount", () => {
    expect(applyDiscount(100, null)).toBe(100);
  });

  it("applies a percent discount", () => {
    expect(applyDiscount(200, { type: "percent", value: 25 })).toBe(150);
  });

  it("applies a percent discount to credits", () => {
    expect(applyDiscount(-200, { type: "percent", value: 25 })).toBe(-150);
  });

  it("applies a fixed discount without flipping the sign", () => {
    expect(applyDiscount(30, { type: "fixed", value: 10 })).toBe(20);
    expect(applyDiscount(-30, { type: "fixed", value: 10 })).toBe(-20);
    expect(applyDiscount(5, { type: "fixed", value: 10 })).toBe(0);
  });
});
