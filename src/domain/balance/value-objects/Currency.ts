import { CurrencyErrors } from "../errors/currency.errors";

export class Currency {
    static currencyErrors = CurrencyErrors;
    private constructor(private readonly value: string) {}

    static create(value: string): Currency {
        if (!Currency.is3CharactersLong(value)) {
            throw this.currencyErrors.currencyMustBe3CharactersLong();
        }

        if (!Currency.isFinite(value)) {
            throw this.currencyErrors.currencyMustBeFinite();
        }

        return new Currency(value);
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
