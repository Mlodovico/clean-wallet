
export class OverdraftLimit {
  private constructor(private readonly cents: number) {}

  static create(value: number): OverdraftLimit {
    if (!Number.isFinite(value)) {
      throw new Error('Overdraft limit must be a valid number');
    }
    if (value < 0) {
      throw new Error('Overdraft limit cannot be negative');
    }

    if (!OverdraftLimit.hasAtMostTwoDecimals(value)) {
      throw new Error('Overdraft limit must have at most 2 decimal places');
    }

    const cents = Math.round(value * 100);

    return new OverdraftLimit(cents);
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