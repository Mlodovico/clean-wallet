import { BadRequestException, NotFoundException } from "@nestjs/common";

import { Client } from "../../domain/client/Client";
import {
  ClientPersistenceRecord,
  ClientRepositoryPort,
} from "../../domain/client/ports/client-repository.port";
import { ClientId } from "../../domain/client/vo/ClientId";

export const findClientOrFail = async (
  clientRepository: ClientRepositoryPort,
  id: string,
): Promise<Client> => {
  const idResult = ClientId.create(id);
  if (idResult.isFailure) {
    throw new BadRequestException(idResult.getError());
  }

  const client = await clientRepository.findById(
    idResult.getValue().getValue(),
  );

  if (!client) {
    throw new NotFoundException("Client not found");
  }

  return client;
};

export const toClientPersistenceRecord = (
  client: Client,
): ClientPersistenceRecord => ({
  publicId: client.id.getValue(),
  name: client.name.getValue(),
  phone: client.phone.getValue(),
  email: client.email.getValue(),
  birthDate: client.birthDate.getValue(),
  document: client.document.getValue(),
  password: client.passwordHash.getValue(),
  status: client.status.getValue(),
});
