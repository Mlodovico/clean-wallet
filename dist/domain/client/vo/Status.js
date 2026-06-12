"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
const Result_1 = require("../../../shared/utils/Result");
class Status {
    value;
    static ALLOWED_STATUSES = new Set([
        "active",
        "inactive",
        "suspended",
        "pending",
    ]);
    constructor(value) {
        this.value = value;
    }
    static create(status) {
        const normalizedStatus = status.trim().toLowerCase();
        if (!normalizedStatus) {
            return Result_1.Result.fail("Status cannot be empty");
        }
        if (normalizedStatus.length > 20) {
            return Result_1.Result.fail("Status cannot be longer than 20 characters");
        }
        if (!this.ALLOWED_STATUSES.has(normalizedStatus)) {
            return Result_1.Result.fail(`Invalid status: ${status}. Allowed values are: ${Array.from(this.ALLOWED_STATUSES).join(", ")}`);
        }
        return Result_1.Result.ok(new Status(normalizedStatus));
    }
    get asString() {
        return this.value;
    }
    getValue() {
        return this.value;
    }
}
exports.Status = Status;
//# sourceMappingURL=Status.js.map