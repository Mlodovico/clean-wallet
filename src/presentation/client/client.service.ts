import { Injectable } from "@nestjs/common";

import {
  CreateClientInput,
  CreateClientUseCase,
} from "../../application/client/create-client.use-case";
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

  update(
    id: string,
    updateData: Omit<UpdateClientInput, "id">,
  ): Promise<Client> {
    return this.updateClientUseCase.execute({ id, ...updateData });
  }
}
