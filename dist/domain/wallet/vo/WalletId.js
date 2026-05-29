"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletId = void 0;
const Result_1 = require("src/shared/utils/Result");
class WalletId {
    value;
    constructor(value) {
        this.value = value;
    }
    static create(id) {
        if (!id || id.trim().length === 0) {
            return Result_1.Result.fail('Wallet ID cannot be empty');
        }
        if (id.length !== 36) {
            return Result_1.Result.fail('Wallet ID must be a valid UUID');
        }
        return Result_1.Result.ok(new WalletId(id));
    }
    getValue() {
        return this.value;
    }
}
exports.WalletId = WalletId;
//# sourceMappingURL=WalletId.js.map