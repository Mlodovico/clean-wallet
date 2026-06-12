"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Description = void 0;
const description_errors_1 = require("../errors/description.errors");
const Result_1 = require("../../../shared/utils/Result");
class Description {
    value;
    constructor(value) {
        this.value = value;
    }
    static descriptionErrors = description_errors_1.DescriptionErrors;
    static create(value) {
        if (!Description.isValidDescription(value)) {
            return Result_1.Result.fail(this.descriptionErrors.descriptionMustBeString().message);
        }
        if (Description.isEmpty(value)) {
            return Result_1.Result.fail(this.descriptionErrors.descriptionMustNotBeEmptyString().message);
        }
        if (Description.isTooLong(value)) {
            return Result_1.Result.fail(this.descriptionErrors.descriptionMustNotBeTooLong().message);
        }
        return Result_1.Result.ok(new Description(value));
    }
    static isValidDescription(value) {
        return typeof value === "string" && value.length > 0;
    }
    static isEmpty(value) {
        return value.length === 0;
    }
    static isTooLong(value) {
        return value.length > 255;
    }
    getValue() {
        return this.value;
    }
}
exports.Description = Description;
//# sourceMappingURL=Description.js.map