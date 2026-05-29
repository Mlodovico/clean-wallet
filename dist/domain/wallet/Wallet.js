"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const Result_1 = require("src/shared/utils/Result");
const WalletId_1 = require("./vo/WalletId");
const walletTypes_1 = require("./vo/walletTypes");
const currency_1 = require("./vo/currency");
const walletLimit_1 = require("./vo/walletLimit");
class Wallet {
    id;
    clientId;
    walletType;
    currency;
    walletLimit;
    createdAt;
    updatedAt;
    constructor(id, clientId, walletType, currency, walletLimit, createdAt, updatedAt) {
        this.id = id;
        this.clientId = clientId;
        this.walletType = walletType;
        this.currency = currency;
        this.walletLimit = walletLimit;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static create(props) {
        const walletIdResult = WalletId_1.WalletId.create(props.id);
        if (walletIdResult.isFailure) {
            return Result_1.Result.fail(`Invalid wallet ID: ${walletIdResult.getError()}`);
        }
        const walletTypeResult = walletTypes_1.WalletType.create(props.walletType);
        if (walletTypeResult.isFailure) {
            return Result_1.Result.fail(`Invalid wallet type: ${walletTypeResult.getError()}`);
        }
        const currencyResult = currency_1.Currency.create(props.currency);
        if (currencyResult.isFailure) {
            return Result_1.Result.fail(`Invalid currency: ${currencyResult.getError()}`);
        }
        const walletLimitResult = walletLimit_1.WalletLimit.create(props.walletLimit);
        if (walletLimitResult.isFailure) {
            return Result_1.Result.fail(`Invalid wallet limit: ${walletLimitResult.getError()}`);
        }
        return Result_1.Result.ok(new Wallet(walletIdResult.getValue(), props.clientId, walletTypeResult.getValue(), currencyResult.getValue(), walletLimitResult.getValue(), new Date(), new Date()));
    }
}
exports.Wallet = Wallet;
//# sourceMappingURL=Wallet.js.map