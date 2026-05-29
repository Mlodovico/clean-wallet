"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameErrors = void 0;
class NameErrors extends Error {
    static nameCannotBeEmpty() {
        return new NameErrors('Name cannot be empty');
    }
    static nameCannotExceed100Characters() {
        return new NameErrors('Name cannot exceed 100 characters');
    }
}
exports.NameErrors = NameErrors;
//# sourceMappingURL=name.errors.js.map