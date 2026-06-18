import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "src/domain/client/client.entity";

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(Client)
    private readonly repository: Repository<Client>
  ) {}

  async create(client: Partial<Client>): Promise<Client> {
    return this.repository.save(client);
  }

  async findAll(): Promise<Client[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Client | null> {
    return this.repository.findOneBy({ id });
  }
}
