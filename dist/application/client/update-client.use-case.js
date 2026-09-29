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
const email_errors_1 = require("../../domain/client/errors/email.errors");
const client_repository_port_1 = require("../../domain/client/ports/client-repository.port");
const client_use_case_helpers_1 = require("./client-use-case.helpers");
let UpdateClientUseCase = class UpdateClientUseCase {
    clientRepository;
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async execute(input) {
        const client = await (0, client_use_case_helpers_1.findClientOrFail)(this.clientRepository, input.id);
        const clientResult = client.update(input);
        if (clientResult.isFailure) {
            throw new common_1.BadRequestException(clientResult.getError());
        }
        const updated = clientResult.getValue();
        if (updated.document.getValue() !== client.document.getValue()) {
            const existing = await this.clientRepository.findByDocument(updated.document.getValue());
            if (existing) {
                throw new common_1.ConflictException(document_errors_1.DocumentErrors.documentAlreadyInUse().message);
            }
        }
        if (updated.email.getValue() !== client.email.getValue()) {
            const existing = await this.clientRepository.findByEmail(updated.email.getValue());
            if (existing) {
                throw new common_1.ConflictException(email_errors_1.EmailErrors.emailAlreadyInUse().message);
            }
        }
        try {
            await this.clientRepository.update(updated.id.getValue(), (0, client_use_case_helpers_1.toClientPersistenceRecord)(updated));
        }
        catch {
            throw new common_1.InternalServerErrorException("Failed to update client");
        }
        return updated;
    }
};
exports.UpdateClientUseCase = UpdateClientUseCase;
exports.UpdateClientUseCase = UpdateClientUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_repository_port_1.ClientRepositoryPort])
], UpdateClientUseCase);
//# sourceMappingURL=update-client.use-case.js.map