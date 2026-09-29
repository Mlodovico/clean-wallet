import { Injectable } from "@nestjs/common";

import { ChangeClientPasswordUseCase } from "../../application/client/change-client-password.use-case";
import {
  ChangeClientStatusUseCase,
  ClientStatusAction,
} from "../../application/client/change-client-status.use-case";
import {
  CreateClientInput,
  CreateClientUseCase,
} from "../../application/client/create-client.use-case";
import {
  FindClientInput,
  FindClientUseCase,
} from "../../application/client/find-client.use-case";
import { GetClientUseCase } from "../../application/client/get-client.use-case";
import {
  UpdateClientInput,
  UpdateClientUseCase,
} from "../../application/client/update-client.use-case";
import { Client } from "../../domain/client/Client";

@Injectable()
export class ClientService {
  private clients: Client[] = [];

  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly getClientUseCase: GetClientUseCase,
    private readonly updateClientUseCase: UpdateClientUseCase,
    private readonly changeClientStatusUseCase: ChangeClientStatusUseCase,
    private readonly changeClientPasswordUseCase: ChangeClientPasswordUseCase,
    private readonly findClientUseCase: FindClientUseCase,
  ) {}

  findAll(): Client[] {
    return this.clients;
  }

  async create(clientData: CreateClientInput): Promise<Client> {
    const newClient = await this.createClientUseCase.execute(clientData);
    this.clients.push(newClient);
    return newClient;
  }

  findOne(id: string): Promise<Client> {
    return this.getClientUseCase.execute(id);
  }

  findBy(criteria: FindClientInput): Promise<Client> {
    return this.findClientUseCase.execute(criteria);
  }

  update(
    id: string,
    updateData: Omit<UpdateClientInput, "id">,
  ): Promise<Client> {
    return this.updateClientUseCase.execute({ id, ...updateData });
  }

  changeStatus(id: string, action: ClientStatusAction): Promise<Client> {
    return this.changeClientStatusUseCase.execute({ id, action });
  }

  changePassword(
    id: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    return this.changeClientPasswordUseCase.execute({
      id,
      currentPassword,
      newPassword,
    });
  }
}
