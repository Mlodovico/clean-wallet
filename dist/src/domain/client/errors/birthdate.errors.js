"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BirthdateErrors = void 0;
class BirthdateErrors extends Error {
    constructor(message) {
        super(message);
        this.name = "birthdateErrors";
    }
    static birthdateMustBeValidDate() {
        return new BirthdateErrors("Birthdate must be a valid date.");
    }
    static invalidBirthdateFormate() {
        return new BirthdateErrors("Invalid birthdate format.");
    }
    static birthdateMustBeInThePast() {
        return new BirthdateErrors("Birthdate must be in the past.");
    }
    static birthdateMustNotBeEmpty() {
        return new BirthdateErrors("Birthdate must not be empty.");
    }
    static birthdateMustBeAtLeast18YearsOld(minAge) {
        return new BirthdateErrors(`Client must be at least ${minAge} years old.`);
    }
    static birthdateMustNotExceedMaximumAge(maxAge) {
        return new BirthdateErrors(`Client cannot be older than ${maxAge} years.`);
    }
}
exports.BirthdateErrors = BirthdateErrors;
//# sourceMappingURL=birthdate.errors.js.map