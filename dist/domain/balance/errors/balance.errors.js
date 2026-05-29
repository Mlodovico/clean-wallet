"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceIdErrors = void 0;
class BalanceIdErrors extends Error {
    constructor(message) {
        super(message);
        this.name = 'balanceIdErrors';
    }
    static balanceIdMustBeString() {
        return new BalanceIdErrors('Balance ID must be a string');
    }
    static balanceIdMustNotBeEmptyString() {
        return new BalanceIdErrors('Balance Id must not be empty string');
    }
    ;
}
exports.BalanceIdErrors = BalanceIdErrors;
//# sourceMappingURL=balance.errors.js.map