"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescriptionErrors = void 0;
class DescriptionErrors extends Error {
    constructor(message) {
        super(message);
        this.name = 'DescriptionErrors';
    }
    static descriptionMustBeString() {
        return new DescriptionErrors('Description must be a string');
    }
    static descriptionMustNotBeEmptyString() {
        return new DescriptionErrors('Description must not be an empty string');
    }
    static descriptionMustNotBeTooLong() {
        return new DescriptionErrors('Description must not be too long');
    }
}
exports.DescriptionErrors = DescriptionErrors;
//# sourceMappingURL=description.errors.js.map