"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const Result_1 = require("src/shared/utils/Result");
class Email {
    value;
    constructor(value) {
        this.value = value;
    }
    static create(email) {
        if (!this.isValid(email)) {
            return Result_1.Result.fail("Invalid email format");
        }
        return Result_1.Result.ok(new Email(email.toLocaleLowerCase().trim()));
    }
    static isValid(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    getValue() {
        return this.value;
    }
}
exports.Email = Email;
//# sourceMappingURL=Email.js.map