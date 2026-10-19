import { Injectable, Logger } from "@nestjs/common";

import {
  BrokerMessage,
  MessageBrokerPort,
} from "../../application/port/message-broker.port";

@Injectable()
export class LoggerMessageBroker implements MessageBrokerPort {
  private readonly logger = new Logger("MessageBroker");

  publish(message: BrokerMessage): Promise<void> {
    this.logger.log(
      JSON.stringify({
        id: message.id,
        type: message.type,
        payload: message.payload,
        occurredAt: message.occurredAt.toISOString(),
      }),
    );

    return Promise.resolve();
  }
}
