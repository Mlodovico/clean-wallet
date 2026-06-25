import { Injectable } from "@nestjs/common";

import {
  CreateClientInput,
  CreateClientUseCase,
} from "../../application/client/create-client.use-case";
import { Client } from "../../domain/client/Client";

@Injectable()
export class ClientService {
  private clients: Client[] = [];

  constructor(private readonly createClientUseCase: CreateClientUseCase) {}

  findAll(): Client[] {
    return this.clients;
  }

  async create(clientData: CreateClientInput): Promise<Client> {
    const newClient = await this.createClientUseCase.execute(clientData);
    this.clients.push(newClient);
    return newClient;
  }

  findOne(id: string): Client | undefined {
    return this.clients.find((client) => client.id.getValue() === id);
  }

  update(id: string, updateData: Partial<Client>): Client | undefined {
    const clientIndex = this.clients.findIndex(
      (client) => client.id.getValue() === id,
    );
    if (clientIndex === -1) {
      return undefined;
    }
    const updatedClient = {
      ...this.clients[clientIndex],
      ...updateData,
      updatedAt: new Date(),
    };
    this.clients[clientIndex] = updatedClient as Client;
    return updatedClient as Client;
  }
}
