"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Balance = void 0;
const Result_1 = require("../../shared/utils/Result");
const Amount_1 = require("./vo/Amount");
const BalanceId_1 = require("./vo/BalanceId");
const Currency_1 = require("./vo/Currency");
const Description_1 = require("./vo/Description");
const OverdraftLimit_1 = require("./vo/OverdraftLimit");
const TrancactionType_1 = require("./vo/TrancactionType");
const TransactionId_1 = require("./vo/TransactionId");
class Balance {
    id;
    amount;
    overdraftLimit;
    currency;
    transactionType;
    transactionId;
    description;
    createdAt;
    updatedAt;
    constructor(id, amount, overdraftLimit, currency, transactionType, transactionId, description, createdAt, updatedAt) {
        this.id = id;
        this.amount = amount;
        this.overdraftLimit = overdraftLimit;
        this.currency = currency;
        this.transactionType = transactionType;
        this.transactionId = transactionId;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static create(props) {
        const amountResult = Amount_1.Amount.create(props.amount);
        if (amountResult.isFailure) {
            return Result_1.Result.fail(`Invalid amount: ${amountResult.getError()}`);
        }
        const overdraftLimitResult = OverdraftLimit_1.OverdraftLimit.create(props.overdraftLimit);
        if (overdraftLimitResult.isFailure) {
            return Result_1.Result.fail(`Invalid overdraft limit: ${overdraftLimitResult.getError()}`);
        }
        const currencyResult = Currency_1.Currency.create(props.currency);
        if (currencyResult.isFailure) {
            return Result_1.Result.fail(`Invalid currency: ${currencyResult.getError()}`);
        }
        const transactionTypeResult = TrancactionType_1.TransactionType.create(props.transactionType);
        if (transactionTypeResult.isFailure) {
            return Result_1.Result.fail(`Invalid transaction type: ${transactionTypeResult.getError()}`);
        }
        const transactionIdResult = TransactionId_1.TransactionId.create(props.transactionId);
        if (transactionIdResult.isFailure) {
            return Result_1.Result.fail(`Invalid transaction id: ${transactionIdResult.getError()}`);
        }
        const descriptionResult = Description_1.Description.create(props.description);
        if (descriptionResult.isFailure) {
            return Result_1.Result.fail(`Invalid description: ${descriptionResult.getError()}`);
        }
        return Result_1.Result.ok(new Balance(BalanceId_1.BalanceId.generate(), amountResult.getValue(), overdraftLimitResult.getValue(), currencyResult.getValue(), transactionTypeResult.getValue(), transactionIdResult.getValue(), descriptionResult.getValue(), new Date(), new Date()));
    }
}
exports.Balance = Balance;
//# sourceMappingURL=Balance.js.map