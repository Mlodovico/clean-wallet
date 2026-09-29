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
exports.ChangeClientPasswordUseCase = void 0;
const common_1 = require("@nestjs/common");
const password_errors_1 = require("../../domain/client/errors/password.errors");
const client_repository_port_1 = require("../../domain/client/ports/client-repository.port");
const Password_1 = require("../../domain/client/vo/Password");
const event_publisher_port_1 = require("../port/event-publisher.port");
const password_hasher_port_1 = require("../port/password-hasher.port");
const client_use_case_helpers_1 = require("./client-use-case.helpers");
let ChangeClientPasswordUseCase = class ChangeClientPasswordUseCase {
    clientRepository;
    passwordHasher;
    eventPublisher;
    constructor(clientRepository, passwordHasher, eventPublisher) {
        this.clientRepository = clientRepository;
        this.passwordHasher = passwordHasher;
        this.eventPublisher = eventPublisher;
    }
    async execute(input) {
        const client = await (0, client_use_case_helpers_1.findClientOrFail)(this.clientRepository, input.id);
        const matches = await this.passwordHasher.compare(input.currentPassword ?? "", client.passwordHash.getValue());
        if (!matches) {
            throw new common_1.UnauthorizedException(password_errors_1.PasswordErrors.currentPasswordIsInvalid().message);
        }
        if (input.newPassword === input.currentPassword) {
            throw new common_1.BadRequestException(password_errors_1.PasswordErrors.newPasswordMustBeDifferent().message);
        }
        const passwordResult = Password_1.Password.create(input.newPassword ?? "");
        if (passwordResult.isFailure) {
            throw new common_1.BadRequestException(`Invalid password: ${passwordResult.getError()}`);
        }
        const result = client.changePassword(await this.passwordHasher.hash(input.newPassword));
        if (result.isFailure) {
            throw new common_1.BadRequestException(result.getError());
        }
        const updated = result.getValue();
        try {
            await this.clientRepository.update(updated.id.getValue(), (0, client_use_case_helpers_1.toClientPersistenceRecord)(updated));
        }
        catch {
            throw new common_1.InternalServerErrorException("Failed to change password");
        }
        await this.eventPublisher.publish({
            type: "client.password_changed",
            payload: { clientId: updated.id.getValue() },
            occurredAt: new Date(),
        });
    }
};
exports.ChangeClientPasswordUseCase = ChangeClientPasswordUseCase;
exports.ChangeClientPasswordUseCase = ChangeClientPasswordUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_repository_port_1.ClientRepositoryPort,
        password_hasher_port_1.PasswordHasherPort,
        event_publisher_port_1.EventPublisherPort])
], ChangeClientPasswordUseCase);
//# sourceMappingURL=change-client-password.use-case.js.map