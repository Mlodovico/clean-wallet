export declare class CurrencyErrors extends Error {
    constructor(message: string);
    static currencyMustBe3CharactersLong(): CurrencyErrors;
    static currencyMustBeFinite(): CurrencyErrors;
}
