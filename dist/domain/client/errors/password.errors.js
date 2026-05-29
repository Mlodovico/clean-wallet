"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordErrors = void 0;
class PasswordErrors extends Error {
    static passwordCannotBeEmpty() {
        return new PasswordErrors('Password cannot be empty');
    }
    static passwordValidationFailed() {
        return new PasswordErrors('Password validation failed');
    }
    static passwordMustBeAtLeast6Characters() {
        return new PasswordErrors('Password must be at least 6 characters long');
    }
    static passwordMustContainNumber() {
        return new PasswordErrors('Password must contain at least one number');
    }
    static passwordMustContainSpecialCharacter() {
        return new PasswordErrors('Password must contain at least one special character');
    }
    static passwordMinLengthExceeded(minLength) {
        return new PasswordErrors(`Password must be more than ${minLength} characters long`);
    }
    static passwordMaxLengthExceeded(maxLength) {
        return new PasswordErrors(`Password must be no more than ${maxLength} characters long`);
    }
    static passwordCannotContainSpaces() {
        return new PasswordErrors('Password cannot contain spaces');
    }
    static passwordMustMeetComplexityRequirements() {
        return new PasswordErrors('Password must meet complexity requirements');
    }
}
exports.PasswordErrors = PasswordErrors;
//# sourceMappingURL=password.errors.js.map