"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletLimit = void 0;
const Result_1 = require("../../../shared/utils/Result");
const walletLimit_errors_1 = require("../errors/walletLimit.errors");
class WalletLimit {
    value;
    constructor(value) {
        this.value = value;
    }
    static walletLimitErrors = walletLimit_errors_1.WalletLimitErrors;
    static create(limit) {
        if (limit < 0) {
            return Result_1.Result.fail(this.walletLimitErrors.walletLimitCannotBeNegative().message);
        }
        return Result_1.Result.ok(new WalletLimit(limit));
    }
    getValue() {
        return this.value;
    }
}
exports.WalletLimit = WalletLimit;
//# sourceMappingURL=walletLimit.js.map