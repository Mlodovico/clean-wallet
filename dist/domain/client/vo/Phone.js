"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Phone = void 0;
const Result_1 = require("../../../shared/utils/Result");
class Phone {
    value;
    constructor(value) {
        this.value = value;
    }
    static create(phone) {
        const cleaned = phone.replace(/\D/g, "");
        if (cleaned.length < 10 || cleaned.length > 11) {
            return Result_1.Result.fail("Invalid phone number");
        }
        return Result_1.Result.ok(new Phone(cleaned));
    }
    getValue() {
        return this.value;
    }
    getFormatted() {
        const phone = this.value;
        if (phone.length === 11) {
            return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
        }
        return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6)}`;
    }
}
exports.Phone = Phone;
//# sourceMappingURL=Phone.js.map