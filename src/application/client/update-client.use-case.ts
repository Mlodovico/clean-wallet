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
import {
  findClientOrFail,
  toClientPersistenceRecord,
} from "./client-use-case.helpers";

export type UpdateClientInput = {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  birthDate?: Date | string;
  document?: string;
};

@Injectable()
export class UpdateClientUseCase {
  constructor(private readonly clientRepository: ClientRepositoryPort) {}

  async execute(input: UpdateClientInput): Promise<Client> {
    const client = await findClientOrFail(this.clientRepository, input.id);

    const clientResult = client.update(input);

    if (clientResult.isFailure) {
      throw new BadRequestException(clientResult.getError());
    }

    const updated = clientResult.getValue();

    if (updated.document.getValue() !== client.document.getValue()) {
      const existing = await this.clientRepository.findByDocument(
        updated.document.getValue(),
      );

      if (existing) {
        throw new ConflictException(
          DocumentErrors.documentAlreadyInUse().message,
        );
      }
    }

    if (updated.email.getValue() !== client.email.getValue()) {
      const existing = await this.clientRepository.findByEmail(
        updated.email.getValue(),
      );

      if (existing) {
        throw new ConflictException(EmailErrors.emailAlreadyInUse().message);
      }
    }

    try {
      await this.clientRepository.update(
        updated.id.getValue(),
        toClientPersistenceRecord(updated),
      );
    } catch {
      throw new InternalServerErrorException("Failed to update client");
    }

    return updated;
  }
}
