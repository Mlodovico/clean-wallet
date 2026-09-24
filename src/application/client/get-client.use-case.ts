import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { Client } from "../../domain/client/Client";
import { ClientRepositoryPort } from "../../domain/client/ports/client-repository.port";
import { ClientId } from "../../domain/client/vo/ClientId";

@Injectable()
export class GetClientUseCase {
  constructor(private readonly clientRepository: ClientRepositoryPort) {}

  async execute(id: string): Promise<Client> {
    const idResult = ClientId.create(id);
    if (idResult.isFailure) {
      throw new BadRequestException(idResult.getError());
    }

    const client = await this.clientRepository.findById(
      idResult.getValue().getValue(),
    );

    if (!client) {
      throw new NotFoundException("Client not found");
    }

    return client;
  }
}
