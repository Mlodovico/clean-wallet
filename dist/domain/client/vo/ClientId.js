"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientId = void 0;
const Result_1 = require("../../../shared/utils/Result");
const uuid_1 = require("uuid");
const clientid_errors_1 = require("../errors/clientid.errors");
class ClientId {
    value;
    constructor(value) {
        this.value = value;
    }
    static create(value) {
        const id = value || (0, uuid_1.v4)();
        if (!(0, uuid_1.validate)(id)) {
            return Result_1.Result.fail(clientid_errors_1.ClientIdErrors.clientIdMustBeValidUUID().message);
        }
        return Result_1.Result.ok(new ClientId(id));
    }
    getValue() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.ClientId = ClientId;
//# sourceMappingURL=ClientId.js.map