export class OverdraftLimitErrors extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OverdraftLimitErrors';
  }

  static overdraftLimitMustBeFinite(): OverdraftLimitErrors {
    return new OverdraftLimitErrors('Overdraft limit must be a finite number');
  }

  static overdraftLimitMustBeValidNumbers(): OverdraftLimitErrors {
    return new OverdraftLimitErrors('Overdraft limit must be valid numbers');
  }

  static overdraftLimitCannotBeNegative(): OverdraftLimitErrors {
    return new OverdraftLimitErrors('Overdraft limit cannot be negative');
  }

  static overdraftLimitMustHaveAtMostTwoDecimals(): OverdraftLimitErrors {
    return new OverdraftLimitErrors(
      'Overdraft limit must have at most 2 decimal places',
    );
  }
}
