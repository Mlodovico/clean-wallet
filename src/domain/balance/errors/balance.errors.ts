
export class BalanceIdErrors extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'balanceIdErrors';
  }

  static balanceIdMustBeString(): BalanceIdErrors {
    return new BalanceIdErrors('Balance ID must be a string');
  }

  static balanceIdMustNotBeEmptyString(): BalanceIdErrors {
    return new BalanceIdErrors('Balance Id must not be empty string')
  };
}