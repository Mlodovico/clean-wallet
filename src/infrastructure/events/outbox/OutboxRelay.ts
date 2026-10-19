import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from "@nestjs/common";
import { DataSource } from "typeorm";

import { MessageBrokerPort } from "../../../application/port/message-broker.port";
import { OutboxMessage } from "./outbox-message.entity";

@Injectable()
export class OutboxRelay
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger(OutboxRelay.name);
  private timer?: NodeJS.Timeout;
  private running = false;

  constructor(
    private readonly dataSource: DataSource,
    private readonly broker: MessageBrokerPort,
  ) {}

  onApplicationBootstrap() {
    this.timer = setInterval(() => void this.tick(), 1000);
  }

  onApplicationShutdown() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private async tick() {
    if (this.running) return;
    this.running = true;

    try {
      await this.dataSource.transaction(async (manager) => {
        const messages = await manager
          .getRepository(OutboxMessage)
          .createQueryBuilder("m")
          .where("m.publishedAt IS NULL")
          .orderBy("m.occurredAt", "ASC")
          .limit(50)
          .setLock("pessimistic_write")
          .setOnLocked("skip_locked")
          .getMany();

        for (const message of messages) {
          try {
            await this.broker.publish({
              id: message.id,
              type: message.type,
              payload: message.payload,
              occurredAt: message.occurredAt,
            });
            message.publishedAt = new Date();
          } catch (error) {
            message.attempts += 1;
            message.lastError =
              error instanceof Error ? error.message : String(error);
            break;
          }
        }

        await manager.save(messages);
      });
    } catch (error) {
      this.logger.error("Outbox relay failed", error);
    } finally {
      this.running = false;
    }
  }
}
