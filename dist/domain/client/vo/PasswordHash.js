"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordHash = void 0;
const Result_1 = require("../../../shared/utils/Result");
const password_errors_1 = require("../errors/password.errors");
class PasswordHash {
    value;
    constructor(value) {
        this.value = value;
    }
    static create(hash) {
        if (!hash || !hash.trim()) {
            return Result_1.Result.fail(password_errors_1.PasswordErrors.passwordHashCannotBeEmpty().message);
        }
        return Result_1.Result.ok(new PasswordHash(hash));
    }
    getValue() {
        return this.value;
    }
}
exports.PasswordHash = PasswordHash;
//# sourceMappingURL=PasswordHash.js.map