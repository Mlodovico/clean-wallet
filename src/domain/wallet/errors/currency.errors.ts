
export class CurrencyErrors extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CurrencyErrors';
    }

    static currencyMustBePositive(): CurrencyErrors {
        return new CurrencyErrors('Currency must be positive');
    }

    static currencyMustNotBeEmptyString(): CurrencyErrors {
        return new CurrencyErrors('Currency must not be an empty string');
    }

    static currencyMustBeValidCode(): CurrencyErrors {
        return new CurrencyErrors('Currency must be a valid ISO 4217 code');
    }
}