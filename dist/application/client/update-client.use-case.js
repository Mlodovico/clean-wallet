"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClientUseCase = void 0;
const common_1 = require("@nestjs/common");
const document_errors_1 = require("../../domain/client/errors/document.errors");
const client_repository_port_1 = require("../../domain/client/ports/client-repository.port");
const ClientId_1 = require("../../domain/client/vo/ClientId");
let UpdateClientUseCase = class UpdateClientUseCase {
    clientRepository;
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async execute(input) {
        const idResult = ClientId_1.ClientId.create(input.id);
        if (idResult.isFailure) {
            throw new common_1.BadRequestException(idResult.getError());
        }
        const publicId = idResult.getValue().getValue();
        const client = await this.clientRepository.findById(publicId);
        if (!client) {
            throw new common_1.NotFoundException("Client not found");
        }
        const { id: _id, ...changes } = input;
        const clientResult = client.update(changes);
        if (clientResult.isFailure) {
            throw new common_1.BadRequestException(clientResult.getError());
        }
        const updated = clientResult.getValue();
        const documentChanged = updated.document.getValue() !== client.document.getValue();
        if (documentChanged) {
            const existing = await this.clientRepository.findByDocument(updated.document.getValue());
            if (existing) {
                throw new common_1.ConflictException(document_errors_1.DocumentErrors.documentAlreadyInUse().message);
            }
        }
        try {
            await this.clientRepository.update(publicId, this.toPersistenceRecord(updated));
        }
        catch {
            throw new common_1.InternalServerErrorException("Failed to update client");
        }
        return updated;
    }
    toPersistenceRecord(client) {
        return {
            publicId: client.id.getValue(),
            name: client.name.getValue(),
            phone: client.phone.getValue(),
            email: client.email.getValue(),
            birthDate: client.birthDate.getValue(),
            document: client.document.getValue(),
            password: client.password.getValue(),
            status: client.status.getValue(),
        };
    }
};
exports.UpdateClientUseCase = UpdateClientUseCase;
exports.UpdateClientUseCase = UpdateClientUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_repository_port_1.ClientRepositoryPort])
], UpdateClientUseCase);
//# sourceMappingURL=update-client.use-case.js.map