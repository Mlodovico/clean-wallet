import { Injectable } from '@nestjs/common';
import { Client } from '../../domain/client/Client';

@Injectable()
export class ClientService {
  private clients: Client[] = [];

  findAll(): Client[] {
    return this.clients;
  }

  create(clientData: Partial<Client>): Client {
    const newClient = Client.create({
      Name: clientData.name,
      Phone: clientData.phone,
      Email: clientData.email,
      BirthDate: clientData.birthDate,
      Document: clientData.document,
      Password: clientData.password,
      Status: clientData.status,
    });
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
