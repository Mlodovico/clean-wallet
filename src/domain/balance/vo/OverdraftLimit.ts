import { Result } from "src/shared/utils/Result";
import { OverdraftLimitErrors } from "../errors/overdraftLimit.errors";

export class OverdraftLimit {
  private constructor(private readonly cents: number) {}

  static create(value: number): Result<OverdraftLimit> {
    if (!Number.isFinite(value)) {
      return Result.fail<OverdraftLimit>(
        OverdraftLimitErrors.overdraftLimitMustBeValidNumbers().message,
      );
    }
    if (value < 0) {
      return Result.fail<OverdraftLimit>(
        OverdraftLimitErrors.overdraftLimitCannotBeNegative().message,
      );
    }

    if (!OverdraftLimit.hasAtMostTwoDecimals(value)) {
      return Result.fail<OverdraftLimit>(
        OverdraftLimitErrors.overdraftLimitMustHaveAtMostTwoDecimals().message,
      );
    }

    const cents = Math.round(value * 100);

    return Result.ok<OverdraftLimit>(new OverdraftLimit(cents));
  }

  private static hasAtMostTwoDecimals(value: number): boolean {
    return Number.isInteger(value * 100);
  }

  isZero(): boolean {
    return this.cents === 0;
  }

  isPositive(): boolean {
    return this.cents > 0;
  }

  getValue(): number {
    return this.cents / 100;
  }

  getCents(): number {
    return this.cents;
  }
}
