import { formatMoney, roundMoney } from "./currency";

describe("roundMoney", () => {
  it("rounds to cents by default", () => {
    expect(roundMoney(12.344)).toBe(12.34);
    expect(roundMoney(12.346)).toBe(12.35);
  });

  it("rounds half to even", () => {
    expect(roundMoney(10.125)).toBe(10.12);
    expect(roundMoney(10.375)).toBe(10.38);
    expect(roundMoney(2.5, 0)).toBe(2);
    expect(roundMoney(3.5, 0)).toBe(4);
  });

  it("handles negative amounts", () => {
    expect(roundMoney(-10.125)).toBe(-10.12);
    expect(roundMoney(-4.567)).toBe(-4.57);
  });
});

describe("formatMoney", () => {
  it("formats USD by default", () => {
    expect(formatMoney(1234.5)).toBe("$1,234.50");
  });
});
