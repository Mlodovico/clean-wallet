import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { EventPublisherPort } from "../../application/port/event-publisher.port";
import { MessageBrokerPort } from "../../application/port/message-broker.port";
import { UnitOfWorkPort } from "../../application/port/unit-of-work.port";
import { TypeOrmUnitOfWork } from "../database/TypeOrmUnitOfWork";
import { LoggerMessageBroker } from "./LoggerMessageBroker";
import { OutboxEventPublisher } from "./outbox/OutboxEventPublisher";
import { OutboxMessage } from "./outbox/outbox-message.entity";
import { OutboxRelay } from "./outbox/OutboxRelay";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([OutboxMessage])],
  providers: [
    {
      provide: UnitOfWorkPort,
      useClass: TypeOrmUnitOfWork,
    },
    {
      provide: EventPublisherPort,
      useClass: OutboxEventPublisher,
    },
    {
      provide: MessageBrokerPort,
      useClass: LoggerMessageBroker,
    },
    OutboxRelay,
  ],
  exports: [UnitOfWorkPort, EventPublisherPort],
})

export class EventsModule {}
