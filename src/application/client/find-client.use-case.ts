import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { Client } from "../../domain/client/Client";
import { ClientRepositoryPort } from "../../domain/client/ports/client-repository.port";
import { ClientDocument } from "../../domain/client/vo/ClientDocument";
import { Email } from "../../domain/client/vo/Email";

export type FindClientInput = {
  document?: string;
  email?: string;
};

@Injectable()
export class FindClientUseCase {
  constructor(private readonly clientRepository: ClientRepositoryPort) {}

  async execute(input: FindClientInput): Promise<Client> {
    if (!input.document === !input.email) {
      throw new BadRequestException("Provide exactly one of document or email");
    }

    const client = input.document
      ? await this.findByDocument(input.document)
      : await this.findByEmail(input.email!);

    if (!client) {
      throw new NotFoundException("Client not found");
    }

    return client;
  }

  private findByDocument(document: string): Promise<Client | null> {
    const documentResult = ClientDocument.create(document);
    if (documentResult.isFailure) {
      throw new BadRequestException(documentResult.getError());
    }

    return this.clientRepository.findByDocument(
      documentResult.getValue().getValue(),
    );
  }

  private findByEmail(email: string): Promise<Client | null> {
    const emailResult = Email.create(email);
    if (emailResult.isFailure) {
      throw new BadRequestException(emailResult.getError());
    }

    return this.clientRepository.findByEmail(emailResult.getValue().getValue());
  }
}
