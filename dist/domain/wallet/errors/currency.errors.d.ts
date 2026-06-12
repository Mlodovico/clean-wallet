export declare class CurrencyErrors extends Error {
    constructor(message: string);
    static currencyMustBePositive(): CurrencyErrors;
    static currencyMustNotBeEmptyString(): CurrencyErrors;
    static currencyMustBeValidCode(): CurrencyErrors;
}
