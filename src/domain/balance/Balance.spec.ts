import { validCreateBalanceInput } from "../../testing/fixtures/domain.fixtures";
import { Balance } from "./Balance";

describe("Balance", () => {
  it("creates a valid balance", () => {
    const result = Balance.create(validCreateBalanceInput);

    expect(result.isSuccess).toBe(true);
    expect(result.getValue().amount.getValue()).toBe(150.75);
    expect(result.getValue().currency.getValue()).toBe("BRL");
    expect(result.getValue().description.getValue()).toBe("Initial balance");
  });

  it("fails when amount is zero", () => {
    const result = Balance.create({
      ...validCreateBalanceInput,
      amount: 0,
    });

    expect(result.isFailure).toBe(true);
    expect(result.getError()).toContain("Invalid amount");
  });

  it("fails when currency is invalid", () => {
    const result = Balance.create({
      ...validCreateBalanceInput,
      currency: "BR",
    });

    expect(result.isFailure).toBe(true);
    expect(result.getError()).toContain("Invalid currency");
  });

  it("fails when description is empty", () => {
    const result = Balance.create({
      ...validCreateBalanceInput,
      description: "",
    });

    expect(result.isFailure).toBe(true);
    expect(result.getError()).toContain("Invalid description");
  });
});
