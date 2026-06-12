"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletLimitErrors = void 0;
class WalletLimitErrors extends Error {
    constructor(message) {
        super(message);
        this.name = "WalletLimitErrors";
    }
    static walletLimitCannotBeNegative() {
        return new WalletLimitErrors("Wallet limit cannot be negative");
    }
}
exports.WalletLimitErrors = WalletLimitErrors;
//# sourceMappingURL=walletLimit.errors.js.map