"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceId = void 0;
const crypto_1 = require("crypto");
const balance_errors_1 = require("../errors/balance.errors");
class BalanceId {
    value;
    constructor(value) {
        this.value = value;
    }
    static create(value) {
        if (typeof value !== "string") {
            throw balance_errors_1.BalanceIdErrors.balanceIdMustBeString();
        }
        const normalized = value.trim();
        if (normalized.length === 0) {
            throw balance_errors_1.BalanceIdErrors.balanceIdMustNotBeEmptyString();
        }
        return new BalanceId(normalized);
    }
    static isValidBalanceId(value) {
        return typeof value === "string" && value.trim().length > 0;
    }
    static isUuidV4(value) {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
    }
    static generate() {
        return new BalanceId((0, crypto_1.randomUUID)());
    }
    equals(other) {
        return this.value === other.value;
    }
    getValue() {
        return this.value;
    }
}
exports.BalanceId = BalanceId;
//# sourceMappingURL=BalanceId.js.map