"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currency = void 0;
const Result_1 = require("src/shared/utils/Result");
class Currency {
    value;
    constructor(value) {
        this.value = value;
    }
    static create(value) {
        if (value <= 0) {
            return Result_1.Result.fail('Currency value must be greater than 0');
        }
        return Result_1.Result.ok(new Currency(value));
    }
    getValue() {
        return this.value;
    }
}
exports.Currency = Currency;
//# sourceMappingURL=currency.js.map