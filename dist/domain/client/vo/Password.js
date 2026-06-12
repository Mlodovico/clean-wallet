"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = void 0;
const Result_1 = require("../../../shared/utils/Result");
const password_errors_1 = require("../errors/password.errors");
class Password {
    value;
    static MIN_LENGTH = 8;
    static MAX_LENGTH = 64;
    static COMMON_PASSWORDS = new Set([
        "123456",
        "password",
        "qwerty",
        "12345678",
        "abc123",
        "111111",
        "123123",
    ]);
    constructor(value) {
        this.value = value;
    }
    static create(password) {
        const validationResult = this.validate(password);
        if (!validationResult.isSuccess) {
            return Result_1.Result.fail(password_errors_1.PasswordErrors.passwordValidationFailed().message);
        }
        return Result_1.Result.ok(new Password(password));
    }
    static validate(password) {
        if (password.length < this.MIN_LENGTH) {
            return Result_1.Result.fail(password_errors_1.PasswordErrors.passwordMinLengthExceeded(this.MIN_LENGTH.toString())
                .message);
        }
        if (password.length > this.MAX_LENGTH) {
            return Result_1.Result.fail(password_errors_1.PasswordErrors.passwordMaxLengthExceeded(this.MAX_LENGTH.toString())
                .message);
        }
        if (/\s/.test(password)) {
            return Result_1.Result.fail(password_errors_1.PasswordErrors.passwordCannotContainSpaces().message);
        }
        if (!this.meetsComplexity(password)) {
            return Result_1.Result.fail(password_errors_1.PasswordErrors.passwordMustMeetComplexityRequirements().message);
        }
        if (this.COMMON_PASSWORDS.has(password)) {
            return Result_1.Result.fail(password_errors_1.PasswordErrors.passwordValidationFailed().message);
        }
        return Result_1.Result.ok();
    }
    static meetsComplexity(password) {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialCharacter;
    }
    get asString() {
        return this.value;
    }
    getValue() {
        return this.value;
    }
}
exports.Password = Password;
//# sourceMappingURL=Password.js.map