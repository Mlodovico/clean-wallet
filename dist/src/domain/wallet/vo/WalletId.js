"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletId = void 0;
const crypto_1 = require("crypto");
const Result_1 = require("src/shared/utils/Result");
const walletid_errors_1 = require("../errors/walletid.errors");
class WalletId {
    value;
    constructor(value) {
        this.value = value;
    }
    static walletIdErrors = walletid_errors_1.WalletIdErrors;
    static create(id) {
        if (!id || id.trim().length === 0) {
            return Result_1.Result.fail(this.walletIdErrors.walletIdMustNotBeEmptyString().message);
        }
        if (id.length !== 36) {
            return Result_1.Result.fail(this.walletIdErrors.walletIdMustBeValidUUID().message);
        }
        return Result_1.Result.ok(new WalletId(id));
    }
    static generate() {
        return WalletId.create((0, crypto_1.randomUUID)());
    }
    getValue() {
        return this.value;
    }
}
exports.WalletId = WalletId;
//# sourceMappingURL=WalletId.js.map