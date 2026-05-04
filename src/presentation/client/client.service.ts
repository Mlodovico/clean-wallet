import { Injectable } from '@nestjs/common';
import { Client } from '../../domain/client/Client';

@Injectable()
export class ClientService {
  private clients: Client[] = [];

  findAll(): Client[] {
    return this.clients;
  }

  create(clientData: Client): Client {
    const clientResult = Client.create({
      name: clientData.name.getValue(),
      phone: clientData.phone.getValue(),
      email: clientData.email.getValue(),
      birthDate: clientData.birthDate.getValue(),
      document: clientData.document.getValue(),
      password: clientData.password.getValue(),
      status: clientData.status.getValue(),
    });

    if (clientResult.isFailure) {
      throw new Error(`Failed to create client: ${clientResult.getError()}`);
    }

    const newClient = clientResult.getValue();
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
