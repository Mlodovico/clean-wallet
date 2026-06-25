"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletTypesErrors = void 0;
class WalletTypesErrors extends Error {
    constructor(message) {
        super(message);
        this.name = "WalletTypesErrors";
    }
    static walletTypesMustBeArray() {
        return new WalletTypesErrors("Wallet types must be an array");
    }
    static walletTypesCannotBeEmpty() {
        return new WalletTypesErrors("Wallet types cannot be empty");
    }
    static walletTypesMustContainValidType() {
        return new WalletTypesErrors("Wallet types must contain valid types");
    }
}
exports.WalletTypesErrors = WalletTypesErrors;
//# sourceMappingURL=walletTypes.errors.js.map