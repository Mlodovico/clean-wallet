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
exports.FindClientUseCase = void 0;
const common_1 = require("@nestjs/common");
const client_repository_port_1 = require("../../domain/client/ports/client-repository.port");
const ClientDocument_1 = require("../../domain/client/vo/ClientDocument");
const Email_1 = require("../../domain/client/vo/Email");
let FindClientUseCase = class FindClientUseCase {
    clientRepository;
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async execute(input) {
        if (!input.document === !input.email) {
            throw new common_1.BadRequestException("Provide exactly one of document or email");
        }
        const client = input.document
            ? await this.findByDocument(input.document)
            : await this.findByEmail(input.email);
        if (!client) {
            throw new common_1.NotFoundException("Client not found");
        }
        return client;
    }
    findByDocument(document) {
        const documentResult = ClientDocument_1.ClientDocument.create(document);
        if (documentResult.isFailure) {
            throw new common_1.BadRequestException(documentResult.getError());
        }
        return this.clientRepository.findByDocument(documentResult.getValue().getValue());
    }
    findByEmail(email) {
        const emailResult = Email_1.Email.create(email);
        if (emailResult.isFailure) {
            throw new common_1.BadRequestException(emailResult.getError());
        }
        return this.clientRepository.findByEmail(emailResult.getValue().getValue());
    }
};
exports.FindClientUseCase = FindClientUseCase;
exports.FindClientUseCase = FindClientUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_repository_port_1.ClientRepositoryPort])
], FindClientUseCase);
//# sourceMappingURL=find-client.use-case.js.map