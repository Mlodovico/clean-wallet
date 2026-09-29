"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailErrors = void 0;
class EmailErrors extends Error {
    static emailAlreadyInUse() {
        return new EmailErrors("Client email already in use");
    }
}
exports.EmailErrors = EmailErrors;
//# sourceMappingURL=email.errors.js.map