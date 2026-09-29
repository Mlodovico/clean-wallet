import { Injectable, Logger } from "@nestjs/common";

import {
  DomainEvent,
  EventPublisherPort,
} from "../../application/port/event-publisher.port";

@Injectable()
export class LoggerEventPublisher implements EventPublisherPort {
  private readonly logger = new Logger("DomainEvents");

  publish(event: DomainEvent): Promise<void> {
    this.logger.log(
      JSON.stringify({
        type: event.type,
        payload: event.payload,
        occurredAt: event.occurredAt.toISOString(),
      }),
    );

    return Promise.resolve();
  }
}
