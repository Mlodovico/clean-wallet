import { Result } from 'src/shared/utils/Result';

export class Currency {
  private constructor(private readonly value: number) {}

  static create(value: number): Result<Currency> {
    if (value <= 0) {
      return Result.fail<Currency>('Currency value must be greater than 0');
    }

    return Result.ok(new Currency(value));
  }

  getValue(): number {
    return this.value;
  }
}
