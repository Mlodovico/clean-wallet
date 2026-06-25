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
exports.CreateClientUseCase = void 0;
const common_1 = require("@nestjs/common");
const Client_1 = require("../../domain/client/Client");
const client_repository_port_1 = require("../../domain/client/ports/client-repository.port");
let CreateClientUseCase = class CreateClientUseCase {
    clientRepository;
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async execute(input) {
        const birthDate = typeof input.birthDate === "string"
            ? new Date(input.birthDate)
            : input.birthDate;
        const clientResult = Client_1.Client.create({
            name: input.name,
            phone: input.phone,
            email: input.email,
            birthDate,
            document: input.document,
            password: input.password,
            status: input.status,
        });
        if (clientResult.isFailure) {
            throw new common_1.BadRequestException(clientResult.getError());
        }
        const client = clientResult.getValue();
        try {
            await this.clientRepository.save(this.toPersistenceRecord(client));
        }
        catch {
            throw new common_1.InternalServerErrorException("Failed to create client");
        }
        return client;
    }
    toPersistenceRecord(client) {
        return {
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
exports.CreateClientUseCase = CreateClientUseCase;
exports.CreateClientUseCase = CreateClientUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_repository_port_1.ClientRepositoryPort])
], CreateClientUseCase);
//# sourceMappingURL=create-client.use-case.js.map