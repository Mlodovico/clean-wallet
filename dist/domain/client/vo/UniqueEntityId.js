"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueEntityId = void 0;
class UniqueEntityId {
    id;
    constructor(id) {
        this.id = id;
    }
    static generate() {
        return Math.random().toString(36).substr(2, 9);
    }
    static isValid(id) {
        return true;
    }
}
exports.UniqueEntityId = UniqueEntityId;
//# sourceMappingURL=UniqueEntityId.js.map