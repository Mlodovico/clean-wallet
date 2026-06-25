"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyErrors = void 0;
class CurrencyErrors extends Error {
    constructor(message) {
        super(message);
        this.name = "CurrencyErrors";
    }
    static currencyMustBe3CharactersLong() {
        return new CurrencyErrors("Currency must be 3 characters long");
    }
    static currencyMustBeFinite() {
        return new CurrencyErrors("Currency must be a finite number");
    }
}
exports.CurrencyErrors = CurrencyErrors;
//# sourceMappingURL=currency.errors.js.map