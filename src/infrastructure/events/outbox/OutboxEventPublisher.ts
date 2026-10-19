import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { QueryDeepPartialEntity } from "typeorm";
import {
  DomainEvent,
  EventPublisherPort,
} from "../../../application/port/event-publisher.port";
import { transactionContext } from "../../database/transaction-context";
import { OutboxMessage } from "./outbox-message.entity";

@Injectable()
export class OutboxEventPublisher implements EventPublisherPort {
  async publish(event: DomainEvent): Promise<void> {
    const manager = transactionContext.getStore();

    if (!manager) {
      throw new Error(
        "Domain events must be published inside a unit of work",
      );
    }

    await manager.getRepository(OutboxMessage).insert({
      id: event.id ?? randomUUID(),
      type: event.type,
      payload: event.payload as QueryDeepPartialEntity<
        Record<string, unknown>
      >,
      occurredAt: event.occurredAt,
      publishedAt: null,
    });
  }
}
