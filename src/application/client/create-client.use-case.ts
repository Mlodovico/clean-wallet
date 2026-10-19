import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";

import { Client } from "../../domain/client/Client";
import { DocumentErrors } from "../../domain/client/errors/document.errors";
import { EmailErrors } from "../../domain/client/errors/email.errors";
import { ClientRepositoryPort } from "../../domain/client/ports/client-repository.port";
import { Password } from "../../domain/client/vo/Password";
import { EventPublisherPort } from "../port/event-publisher.port";
import { PasswordHasherPort } from "../port/password-hasher.port";
import { toClientPersistenceRecord } from "./client-use-case.helpers";
import { UnitOfWorkPort } from "../port/unit-of-work.port";

export type CreateClientInput = {
  name: string;
  phone: string;
  email: string;
  birthDate: Date | string;
  document: string;
  password: string;
};

@Injectable()
export class CreateClientUseCase {
  constructor(
    private readonly clientRepository: ClientRepositoryPort,
    private readonly passwordHasher: PasswordHasherPort,
    private readonly eventPublisher: EventPublisherPort,
    private readonly unitOfWork: UnitOfWorkPort,
  ) {}

  async execute(input: CreateClientInput): Promise<Client> {
    const passwordResult = Password.create(input.password);
    if (passwordResult.isFailure) {
      throw new BadRequestException(
        `Invalid password: ${passwordResult.getError()}`,
      );
    }

    const birthDate =
      typeof input.birthDate === "string"
        ? new Date(input.birthDate)
        : input.birthDate;

    const clientResult = Client.create({
      name: input.name,
      phone: input.phone,
      email: input.email,
      birthDate,
      document: input.document,
      passwordHash: await this.passwordHasher.hash(input.password),
    });

    if (clientResult.isFailure) {
      throw new BadRequestException(clientResult.getError());
    }

    const client = clientResult.getValue();

    if (
      await this.clientRepository.findByDocument(client.document.getValue())
    ) {
      throw new ConflictException(
        DocumentErrors.documentAlreadyInUse().message,
      );
    }

    if (await this.clientRepository.findByEmail(client.email.getValue())) {
      throw new ConflictException(EmailErrors.emailAlreadyInUse().message);
    }

    try {
      await this.unitOfWork.run(async () => {
        await this.clientRepository.save(toClientPersistenceRecord(client));
        await this.eventPublisher.publish({
          type: "client.created",
          payload: {
            clientId: client.id.getValue(),
            status: client.status.getValue(),
          },
          occurredAt: new Date(),
        });
      });
    } catch {
      throw new InternalServerErrorException("Failed to create client");
    }

    return client;
  }
}
