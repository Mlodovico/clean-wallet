import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";

import { Client } from "../../domain/client/Client";
import {
  ClientPersistenceRecord,
  ClientRepositoryPort,
} from "../../domain/client/ports/client-repository.port";

export type CreateClientInput = {
  name: string;
  phone: string;
  email: string;
  birthDate: Date | string;
  document: string;
  password: string;
  status: string;
};

@Injectable()
export class CreateClientUseCase {
  constructor(private readonly clientRepository: ClientRepositoryPort) {}

  async execute(input: CreateClientInput): Promise<Client> {
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
      password: input.password,
      status: input.status,
    });

    if (clientResult.isFailure) {
      throw new BadRequestException(clientResult.getError());
    }

    const client = clientResult.getValue();

    try {
      await this.clientRepository.save(this.toPersistenceRecord(client));
    } catch {
      throw new InternalServerErrorException("Failed to create client");
    }

    return client;
  }

  private toPersistenceRecord(client: Client): ClientPersistenceRecord {
    return {
      name: client.name.getValue(),
      phone: client.phone.getValue(),
      email: client.email.getValue(),
      birthDate: client.birthDate.getValue(),
      document: client.document.getValue(),
      password: client.password.getValue(),
      status: client.status.getValue(),
    };
  }
}
