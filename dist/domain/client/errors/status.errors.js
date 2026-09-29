"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusErrors = void 0;
class StatusErrors extends Error {
    static invalidTransition(from, to) {
        return new StatusErrors(`Client status cannot change from ${from} to ${to}`);
    }
    static clientIsInactive() {
        return new StatusErrors("Client is inactive and cannot be changed");
    }
    static clientIsNotActive() {
        return new StatusErrors("Client must be active to perform this operation");
    }
}
exports.StatusErrors = StatusErrors;
//# sourceMappingURL=status.errors.js.map