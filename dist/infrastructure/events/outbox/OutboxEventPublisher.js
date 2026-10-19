"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutboxEventPublisher = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const transaction_context_1 = require("../../database/transaction-context");
const outbox_message_entity_1 = require("./outbox-message.entity");
let OutboxEventPublisher = class OutboxEventPublisher {
    async publish(event) {
        const manager = transaction_context_1.transactionContext.getStore();
        if (!manager) {
            throw new Error("Domain events must be published inside a unit of work");
        }
        await manager.getRepository(outbox_message_entity_1.OutboxMessage).insert({
            id: event.id ?? (0, node_crypto_1.randomUUID)(),
            type: event.type,
            payload: event.payload,
            occurredAt: event.occurredAt,
            publishedAt: null,
        });
    }
};
exports.OutboxEventPublisher = OutboxEventPublisher;
exports.OutboxEventPublisher = OutboxEventPublisher = __decorate([
    (0, common_1.Injectable)()
], OutboxEventPublisher);
//# sourceMappingURL=OutboxEventPublisher.js.map