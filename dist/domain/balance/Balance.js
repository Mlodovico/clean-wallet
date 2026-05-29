"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Balance = void 0;
const { randomUUID: uuidv4 } = require('crypto');
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
        return new Balance(uuidv4(), props.amount, props.overdraftLimit, props.currency, props.transactionType, props.transactionId, props.description, new Date(), new Date());
    }
}
exports.Balance = Balance;
//# sourceMappingURL=Balance.js.map