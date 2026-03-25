
export class CurrencyErrors extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CurrencyErrors';
    }

    static currencyMustBe3CharactersLong(): CurrencyErrors {
        return new CurrencyErrors('Currency must be 3 characters long');
    }

    static currencyMustBeFinite(): CurrencyErrors {
        return new CurrencyErrors('Currency must be a finite number');
    }
}