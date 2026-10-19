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
const document_errors_1 = require("../../domain/client/errors/document.errors");
const email_errors_1 = require("../../domain/client/errors/email.errors");
const client_repository_port_1 = require("../../domain/client/ports/client-repository.port");
const Password_1 = require("../../domain/client/vo/Password");
const event_publisher_port_1 = require("../port/event-publisher.port");
const password_hasher_port_1 = require("../port/password-hasher.port");
const client_use_case_helpers_1 = require("./client-use-case.helpers");
const unit_of_work_port_1 = require("../port/unit-of-work.port");
let CreateClientUseCase = class CreateClientUseCase {
    clientRepository;
    passwordHasher;
    eventPublisher;
    unitOfWork;
    constructor(clientRepository, passwordHasher, eventPublisher, unitOfWork) {
        this.clientRepository = clientRepository;
        this.passwordHasher = passwordHasher;
        this.eventPublisher = eventPublisher;
        this.unitOfWork = unitOfWork;
    }
    async execute(input) {
        const passwordResult = Password_1.Password.create(input.password);
        if (passwordResult.isFailure) {
            throw new common_1.BadRequestException(`Invalid password: ${passwordResult.getError()}`);
        }
        const birthDate = typeof input.birthDate === "string"
            ? new Date(input.birthDate)
            : input.birthDate;
        const clientResult = Client_1.Client.create({
            name: input.name,
            phone: input.phone,
            email: input.email,
            birthDate,
            document: input.document,
            passwordHash: await this.passwordHasher.hash(input.password),
        });
        if (clientResult.isFailure) {
            throw new common_1.BadRequestException(clientResult.getError());
        }
        const client = clientResult.getValue();
        if (await this.clientRepository.findByDocument(client.document.getValue())) {
            throw new common_1.ConflictException(document_errors_1.DocumentErrors.documentAlreadyInUse().message);
        }
        if (await this.clientRepository.findByEmail(client.email.getValue())) {
            throw new common_1.ConflictException(email_errors_1.EmailErrors.emailAlreadyInUse().message);
        }
        try {
            await this.unitOfWork.run(async () => {
                await this.clientRepository.save((0, client_use_case_helpers_1.toClientPersistenceRecord)(client));
                await this.eventPublisher.publish({
                    type: "client.created",
                    payload: {
                        clientId: client.id.getValue(),
                        status: client.status.getValue(),
                    },
                    occurredAt: new Date(),
                });
            });
        }
        catch {
            throw new common_1.InternalServerErrorException("Failed to create client");
        }
        return client;
    }
};
exports.CreateClientUseCase = CreateClientUseCase;
exports.CreateClientUseCase = CreateClientUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_repository_port_1.ClientRepositoryPort,
        password_hasher_port_1.PasswordHasherPort,
        event_publisher_port_1.EventPublisherPort,
        unit_of_work_port_1.UnitOfWorkPort])
], CreateClientUseCase);
//# sourceMappingURL=create-client.use-case.js.map