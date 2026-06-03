import { Result } from 'src/shared/utils/Result';
import { CurrencyErrors } from '../errors/currency.errors';

export class Currency {
  private constructor(private readonly value: number) {}
  static currencyErrors = CurrencyErrors;

  static create(value: number): Result<Currency> {
    if (value <= 0) {
      return Result.fail<Currency>(
        this.currencyErrors.currencyMustBePositive().message,
      );
    }

    return Result.ok(new Currency(value));
  }

  getValue(): number {
    return this.value;
  }
}
