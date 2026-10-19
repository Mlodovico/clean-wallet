"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverdraftLimit = void 0;
const Result_1 = require("src/shared/utils/Result");
const overdraftLimit_errors_1 = require("../errors/overdraftLimit.errors");
class OverdraftLimit {
    cents;
    constructor(cents) {
        this.cents = cents;
    }
    static create(value) {
        if (!Number.isFinite(value)) {
            return Result_1.Result.fail(overdraftLimit_errors_1.OverdraftLimitErrors.overdraftLimitMustBeValidNumbers().message);
        }
        if (value < 0) {
            return Result_1.Result.fail(overdraftLimit_errors_1.OverdraftLimitErrors.overdraftLimitCannotBeNegative().message);
        }
        if (!OverdraftLimit.hasAtMostTwoDecimals(value)) {
            return Result_1.Result.fail(overdraftLimit_errors_1.OverdraftLimitErrors.overdraftLimitMustHaveAtMostTwoDecimals().message);
        }
        const cents = Math.round(value * 100);
        return Result_1.Result.ok(new OverdraftLimit(cents));
    }
    static hasAtMostTwoDecimals(value) {
        return Number.isInteger(value * 100);
    }
    isZero() {
        return this.cents === 0;
    }
    isPositive() {
        return this.cents > 0;
    }
    getValue() {
        return this.cents / 100;
    }
    getCents() {
        return this.cents;
    }
}
exports.OverdraftLimit = OverdraftLimit;
//# sourceMappingURL=OverdraftLimit.js.map