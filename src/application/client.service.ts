import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import { ClientRepository } from "../domain/client/client.repository";
import { Client } from "../domain/client/client.entity";

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async create(client: Partial<Client>): Promise<Client> {
    try {
      return await this.clientRepository.create(client);
    } catch (error) {
      throw new InternalServerErrorException("Failed to create client");
    }
  }

  async findAll(): Promise<Client[]> {
    try {
      return await this.clientRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException("Failed to retrieve clients");
    }
  }

  async findOne(id: number): Promise<Client> {
    try {
      const client = await this.clientRepository.findOne(id);
      if (!client) {
        throw new NotFoundException(`Client with id ${id} not found`);
      }

      return client;
    } catch (error) {
      throw new InternalServerErrorException("Failed to retrieve client");
    }
  }
}
