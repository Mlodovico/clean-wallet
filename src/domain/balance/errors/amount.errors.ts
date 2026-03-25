
export class AmountErrors extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'amountErrors';
  }

  static amountMustBeGreaterThanZero(): AmountErrors {
    return new AmountErrors('Amount must be greater than 0');
  }

  static amountMustBeFinite(): AmountErrors {
    return new AmountErrors('Amount must be a finite number');
  }

  static amountMustHaveAtMostTwoDecimals(): AmountErrors {
    return new AmountErrors('Amount must have at most 2 decimal places');
  }
}