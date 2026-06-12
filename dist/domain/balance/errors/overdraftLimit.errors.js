"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverdraftLimitErrors = void 0;
class OverdraftLimitErrors extends Error {
    constructor(message) {
        super(message);
        this.name = "OverdraftLimitErrors";
    }
    static overdraftLimitMustBeFinite() {
        return new OverdraftLimitErrors("Overdraft limit must be a finite number");
    }
    static overdraftLimitMustBeValidNumbers() {
        return new OverdraftLimitErrors("Overdraft limit must be valid numbers");
    }
    static overdraftLimitCannotBeNegative() {
        return new OverdraftLimitErrors("Overdraft limit cannot be negative");
    }
    static overdraftLimitMustHaveAtMostTwoDecimals() {
        return new OverdraftLimitErrors("Overdraft limit must have at most 2 decimal places");
    }
}
exports.OverdraftLimitErrors = OverdraftLimitErrors;
//# sourceMappingURL=overdraftLimit.errors.js.map