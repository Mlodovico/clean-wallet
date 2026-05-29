"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Birthdate = void 0;
const Result_1 = require("../../../shared/utils/Result");
const birthdate_errors_1 = require("../errors/birthdate.errors");
class Birthdate {
    value;
    static MIN_AGE_YEARS = 18;
    static MAX_AGE_YEARS = 100;
    constructor(value) {
        this.value = value;
    }
    static create(birthdate) {
        const date = typeof birthdate === 'string' ? new Date(birthdate) : birthdate;
        if (isNaN(date.getTime())) {
            return Result_1.Result.fail(birthdate_errors_1.BirthdateErrors.invalidBirthdateFormate().message);
        }
        if (this.isInFuture(date)) {
            return Result_1.Result.fail(birthdate_errors_1.BirthdateErrors.birthdateMustBeInThePast().message);
        }
        if (!this.hasMinimumAge(date)) {
            return Result_1.Result.fail(birthdate_errors_1.BirthdateErrors.birthdateMustBeAtLeast18YearsOld(this.MIN_AGE_YEARS.toString()).message);
        }
        if (this.exceedsMaximumAge(date)) {
            return Result_1.Result.fail(birthdate_errors_1.BirthdateErrors.birthdateMustNotExceedMaximumAge(this.MAX_AGE_YEARS.toString()).message);
        }
        return Result_1.Result.ok(new Birthdate(date));
    }
    get asDate() {
        return new Date(this.value);
    }
    get age() {
        const today = new Date();
        let age = today.getFullYear() - this.value.getFullYear();
        const monthDiff = today.getMonth() - this.value.getMonth();
        if (monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < this.value.getDate())) {
            age--;
        }
        return age;
    }
    get toString() {
        return this.value.toISOString().split('T')[0];
    }
    static isInFuture(birthdate) {
        return birthdate > new Date();
    }
    static hasMinimumAge(birthdate) {
        const today = new Date();
        const minAgeDate = new Date(today.getFullYear() - this.MIN_AGE_YEARS, today.getMonth(), today.getDate());
        return birthdate <= minAgeDate;
    }
    static exceedsMaximumAge(birthdate) {
        const today = new Date();
        const maxAgeDate = new Date(today.getFullYear() - this.MAX_AGE_YEARS, today.getMonth(), today.getDate());
        return birthdate < maxAgeDate;
    }
    getValue() {
        return this.asDate;
    }
}
exports.Birthdate = Birthdate;
//# sourceMappingURL=Birthdate.js.map