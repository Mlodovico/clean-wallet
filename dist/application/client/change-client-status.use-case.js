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
exports.ChangeClientStatusUseCase = void 0;
const common_1 = require("@nestjs/common");
const client_repository_port_1 = require("../../domain/client/ports/client-repository.port");
const event_publisher_port_1 = require("../port/event-publisher.port");
const client_use_case_helpers_1 = require("./client-use-case.helpers");
const EVENT_BY_ACTION = {
    activate: "client.activated",
    suspend: "client.suspended",
    deactivate: "client.deactivated",
};
let ChangeClientStatusUseCase = class ChangeClientStatusUseCase {
    clientRepository;
    eventPublisher;
    constructor(clientRepository, eventPublisher) {
        this.clientRepository = clientRepository;
        this.eventPublisher = eventPublisher;
    }
    async execute(input) {
        const client = await (0, client_use_case_helpers_1.findClientOrFail)(this.clientRepository, input.id);
        const result = client[input.action]();
        if (result.isFailure) {
            throw new common_1.ConflictException(result.getError());
        }
        const updated = result.getValue();
        try {
            await this.clientRepository.update(updated.id.getValue(), (0, client_use_case_helpers_1.toClientPersistenceRecord)(updated));
        }
        catch {
            throw new common_1.InternalServerErrorException("Failed to change client status");
        }
        await this.eventPublisher.publish({
            type: EVENT_BY_ACTION[input.action],
            payload: {
                clientId: updated.id.getValue(),
                from: client.status.getValue(),
                to: updated.status.getValue(),
            },
            occurredAt: new Date(),
        });
        return updated;
    }
};
exports.ChangeClientStatusUseCase = ChangeClientStatusUseCase;
exports.ChangeClientStatusUseCase = ChangeClientStatusUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_repository_port_1.ClientRepositoryPort,
        event_publisher_port_1.EventPublisherPort])
], ChangeClientStatusUseCase);
//# sourceMappingURL=change-client-status.use-case.js.map