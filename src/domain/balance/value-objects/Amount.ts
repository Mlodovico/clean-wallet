import { amountErrors } from '../errors/amountErrors.errors';

export class Amount {
  private constructor(private readonly value: number) {}

  static create(amount: number): Amount {
    if (amount <= 0) {
      throw amountErrors.amountMustBeGreaterThanZero();
    }

    if (!Amount.isFinite(amount)) {
      throw amountErrors.amountMustBeFinite();
    }

    if (!Amount.hasAtMostTwoDecimals(amount)) {
      throw amountErrors.amountMustHaveAtMostTwoDecimals();
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
