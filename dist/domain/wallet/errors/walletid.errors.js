"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletIdErrors = void 0;
class WalletIdErrors extends Error {
    constructor(message) {
        super(message);
        this.name = "WalletIdErrors";
    }
    static walletIdMustBeString() {
        return new WalletIdErrors("Wallet ID must be a string");
    }
    static walletIdMustNotBeEmptyString() {
        return new WalletIdErrors("Wallet ID must not be an empty string");
    }
    static walletIdMustBeValidUUID() {
        return new WalletIdErrors("Wallet ID must be a valid UUID");
    }
}
exports.WalletIdErrors = WalletIdErrors;
//# sourceMappingURL=walletid.errors.js.map