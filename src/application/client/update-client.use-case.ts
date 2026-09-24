import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

import { Client } from "../../domain/client/Client";
import { DocumentErrors } from "../../domain/client/errors/document.errors";
import {
  ClientPersistenceRecord,
  ClientRepositoryPort,
} from "../../domain/client/ports/client-repository.port";
import { ClientId } from "../../domain/client/vo/ClientId";

export type UpdateClientInput = {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  birthDate?: Date | string;
  document?: string;
  password?: string;
  status?: string;
};

@Injectable()
export class UpdateClientUseCase {
  constructor(private readonly clientRepository: ClientRepositoryPort) {}

  async execute(input: UpdateClientInput): Promise<Client> {
    const idResult = ClientId.create(input.id);
    if (idResult.isFailure) {
      throw new BadRequestException(idResult.getError());
    }

    const publicId = idResult.getValue().getValue();
    const client = await this.clientRepository.findById(publicId);

    if (!client) {
      throw new NotFoundException("Client not found");
    }

    const { id: _id, ...changes } = input;
    const clientResult = client.update(changes);

    if (clientResult.isFailure) {
      throw new BadRequestException(clientResult.getError());
    }

    const updated = clientResult.getValue();
    const documentChanged =
      updated.document.getValue() !== client.document.getValue();

    if (documentChanged) {
      const existing = await this.clientRepository.findByDocument(
        updated.document.getValue(),
      );

      if (existing) {
        throw new ConflictException(
          DocumentErrors.documentAlreadyInUse().message,
        );
      }
    }

    try {
      await this.clientRepository.update(
        publicId,
        this.toPersistenceRecord(updated),
      );
    } catch {
      throw new InternalServerErrorException("Failed to update client");
    }

    return updated;
  }

  private toPersistenceRecord(client: Client): ClientPersistenceRecord {
    return {
      publicId: client.id.getValue(),
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
