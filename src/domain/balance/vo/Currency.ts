import { Result } from "src/shared/utils/Result";

import { CurrencyErrors } from "../errors/currency.errors";

export class Currency {
  static currencyErrors = CurrencyErrors;
  private constructor(private readonly value: string) {}

  static create(value: string): Result<Currency> {
    if (!Currency.is3CharactersLong(value)) {
      return Result.fail<Currency>(
        this.currencyErrors.currencyMustBe3CharactersLong().message,
      );
    }

    if (!Currency.isFinite(value)) {
      return Result.fail<Currency>(
        this.currencyErrors.currencyMustBeFinite().message,
      );
    }

    return Result.ok<Currency>(new Currency(value));
  }

  static is3CharactersLong(value: string): boolean {
    return value.length === 3;
  }

  static isFinite(value: string): boolean {
    return Number.isFinite(value);
  }

  getValue(): string {
    return this.value;
  }
}
