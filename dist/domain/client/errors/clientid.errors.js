"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientIdErrors = void 0;
class ClientIdErrors extends Error {
    static clientIdMustBeValidUUID() {
        return new Error('Invalid ClientId format. It must be a valid UUID.');
    }
}
exports.ClientIdErrors = ClientIdErrors;
//# sourceMappingURL=clientid.errors.js.map