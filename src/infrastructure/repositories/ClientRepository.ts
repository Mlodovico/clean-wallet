import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Client as ClientEntity } from "../../domain/client/client.entity";
import {
  ClientPersistenceRecord,
  ClientRepositoryPort,
  SavedClientRecord,
} from "../../domain/client/ports/client-repository.port";

@Injectable()
export class ClientRepository implements ClientRepositoryPort {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly repository: Repository<ClientEntity>,
  ) {}

  async save(record: ClientPersistenceRecord): Promise<SavedClientRecord> {
    const saved = await this.repository.save(record);

    return {
      id: saved.id,
      name: saved.name,
      email: saved.email,
      phone: saved.phone,
      birthDate: saved.birthDate,
      document: saved.document,
      password: saved.password,
      status: saved.status,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    };
  }
}
