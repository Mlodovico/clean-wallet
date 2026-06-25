"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currency = void 0;
const Result_1 = require("../../../shared/utils/Result");
const currency_errors_1 = require("../errors/currency.errors");
class Currency {
    value;
    static currencyErrors = currency_errors_1.CurrencyErrors;
    constructor(value) {
        this.value = value;
    }
    static create(value) {
        if (!Currency.is3CharactersLong(value)) {
            return Result_1.Result.fail(this.currencyErrors.currencyMustBe3CharactersLong().message);
        }
        if (!/^[A-Za-z]{3}$/.test(value)) {
            return Result_1.Result.fail(this.currencyErrors.currencyMustBeFinite().message);
        }
        return Result_1.Result.ok(new Currency(value.toUpperCase()));
    }
    static is3CharactersLong(value) {
        return value.length === 3;
    }
    static isFinite(value) {
        return Number.isFinite(value);
    }
    getValue() {
        return this.value;
    }
}
exports.Currency = Currency;
//# sourceMappingURL=Currency.js.map