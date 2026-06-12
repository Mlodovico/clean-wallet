"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyErrors = void 0;
class CurrencyErrors extends Error {
    constructor(message) {
        super(message);
        this.name = "CurrencyErrors";
    }
    static currencyMustBePositive() {
        return new CurrencyErrors("Currency must be positive");
    }
    static currencyMustNotBeEmptyString() {
        return new CurrencyErrors("Currency must not be an empty string");
    }
    static currencyMustBeValidCode() {
        return new CurrencyErrors("Currency must be a valid ISO 4217 code");
    }
}
exports.CurrencyErrors = CurrencyErrors;
//# sourceMappingURL=currency.errors.js.map