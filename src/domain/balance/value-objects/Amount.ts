import { AmountErrors } from '../errors/amount.errors';

export class Amount {
  static amountErrors = AmountErrors;
  private constructor(private readonly value: number) {}

  static create(amount: number): Amount {
    if (amount <= 0) {
      throw this.amountErrors.amountMustBeGreaterThanZero();
    }

    if (!Amount.isFinite(amount)) {
      throw this.amountErrors.amountMustBeFinite();
    }

    if (!Amount.hasAtMostTwoDecimals(amount)) {
      throw this.amountErrors.amountMustHaveAtMostTwoDecimals();
    }

    return new Amount(amount);
  }

  static isPositive(value: number): boolean {
    return value > 0;
  }

  static isNegative(value: number): boolean {
    return value < 0;
  }

  static hasAtMostTwoDecimals(value: number): boolean {
    return Number.isInteger(value * 100);
  }

  static isFinite(value: number): boolean {
    return Number.isFinite(value);
  }

  getValue(): number {
    return this.value;
  }
}
