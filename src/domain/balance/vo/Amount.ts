import { Result } from 'src/shared/utils/Result';

import { AmountErrors } from '../errors/amount.errors';

export class Amount {
  static amountErrors = AmountErrors;
  private constructor(private readonly value: number) {}

  static create(amount: number): Result<Amount> {
    if (amount <= 0) {
      return Result.fail<Amount>(
        this.amountErrors.amountMustBeFinite().message,
      );
    }

    if (!Amount.isFinite(amount)) {
      return Result.fail<Amount>(
        this.amountErrors.amountMustBeFinite().message,
      );
    }

    if (!Amount.hasAtMostTwoDecimals(amount)) {
      return Result.fail<Amount>(
        this.amountErrors.amountMustHaveAtMostTwoDecimals().message,
      );
    }

    return Result.ok<Amount>(new Amount(amount));
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
