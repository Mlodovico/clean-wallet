"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toClientPersistenceRecord = exports.findClientOrFail = void 0;
const common_1 = require("@nestjs/common");
const ClientId_1 = require("../../domain/client/vo/ClientId");
const findClientOrFail = async (clientRepository, id) => {
    const idResult = ClientId_1.ClientId.create(id);
    if (idResult.isFailure) {
        throw new common_1.BadRequestException(idResult.getError());
    }
    const client = await clientRepository.findById(idResult.getValue().getValue());
    if (!client) {
        throw new common_1.NotFoundException("Client not found");
    }
    return client;
};
exports.findClientOrFail = findClientOrFail;
const toClientPersistenceRecord = (client) => ({
    publicId: client.id.getValue(),
    name: client.name.getValue(),
    phone: client.phone.getValue(),
    email: client.email.getValue(),
    birthDate: client.birthDate.getValue(),
    document: client.document.getValue(),
    password: client.passwordHash.getValue(),
    status: client.status.getValue(),
});
exports.toClientPersistenceRecord = toClientPersistenceRecord;
//# sourceMappingURL=client-use-case.helpers.js.map