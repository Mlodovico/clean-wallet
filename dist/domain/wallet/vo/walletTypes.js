"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletType = void 0;
const Result_1 = require("../../../shared/utils/Result");
const walletTypes_errors_1 = require("../errors/walletTypes.errors");
class WalletType {
    value;
    constructor(value) {
        this.value = value;
    }
    static walletTypeErrors = walletTypes_errors_1.WalletTypesErrors;
    static create(type) {
        const validTypes = ["personal", "business"];
        if (!validTypes.includes(type)) {
            return Result_1.Result.fail(this.walletTypeErrors.walletTypesMustBeArray().message);
        }
        return Result_1.Result.ok(new WalletType(type));
    }
    getValue() {
        return this.value;
    }
}
exports.WalletType = WalletType;
//# sourceMappingURL=walletTypes.js.map