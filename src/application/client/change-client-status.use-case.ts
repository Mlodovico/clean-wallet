import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";

import { Client } from "../../domain/client/Client";
import { ClientRepositoryPort } from "../../domain/client/ports/client-repository.port";
import {
  DomainEventType,
  EventPublisherPort,
} from "../port/event-publisher.port";
import {
  findClientOrFail,
  toClientPersistenceRecord,
} from "./client-use-case.helpers";
import { UnitOfWorkPort } from "../port/unit-of-work.port";

export type ClientStatusAction = "activate" | "suspend" | "deactivate";

export type ChangeClientStatusInput = {
  id: string;
  action: ClientStatusAction;
};

const EVENT_BY_ACTION: Record<ClientStatusAction, DomainEventType> = {
  activate: "client.activated",
  suspend: "client.suspended",
  deactivate: "client.deactivated",
};

@Injectable()
export class ChangeClientStatusUseCase {
  constructor(
    private readonly clientRepository: ClientRepositoryPort,
    private readonly eventPublisher: EventPublisherPort,
    private readonly unitOfWork: UnitOfWorkPort,
  ) {}

  async execute(input: ChangeClientStatusInput): Promise<Client> {
    const client = await findClientOrFail(this.clientRepository, input.id);

    const result = client[input.action]();
    if (result.isFailure) {
      throw new ConflictException(result.getError());
    }

    const updated = result.getValue();

    try {
      await this.unitOfWork.run(async () => {
        await this.clientRepository.update(
          updated.id.getValue(),
          toClientPersistenceRecord(updated),
        );
        await this.eventPublisher.publish({
          type: EVENT_BY_ACTION[input.action],
          payload: {
            clientId: updated.id.getValue(),
            from: client.status.getValue(),
            to: updated.status.getValue(),
          },
          occurredAt: new Date(),
        });
      });
    } catch {
      throw new InternalServerErrorException("Failed to change client status");
    }

    return updated;
  }
}
