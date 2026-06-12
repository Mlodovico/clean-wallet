"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Name = void 0;
const Result_1 = require("../../../shared/utils/Result");
const name_errors_1 = require("../errors/name.errors");
class Name {
    value;
    constructor(value) {
        this.value = value;
    }
    static create(name) {
        if (!name || name.trim().length === 0) {
            return Result_1.Result.fail(name_errors_1.NameErrors.nameCannotBeEmpty().message);
        }
        if (name.length > 100) {
            return Result_1.Result.fail(name_errors_1.NameErrors.nameCannotExceed100Characters().message);
        }
        return Result_1.Result.ok(new Name(name.trim()));
    }
    getValue() {
        return this.value;
    }
}
exports.Name = Name;
//# sourceMappingURL=Name.js.map