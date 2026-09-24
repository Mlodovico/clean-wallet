import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { withRetry } from "../../shared/resilience/retry";
import { Client } from "../../domain/client/Client";
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
    const saved = await withRetry(() => this.repository.save(record));

    return this.toSavedRecord(saved);
  }

  async update(
    publicId: string,
    record: ClientPersistenceRecord,
  ): Promise<SavedClientRecord> {
    const existing = await withRetry(() =>
      this.repository.findOneBy({ publicId }),
    );

    if (!existing) {
      throw new Error("Client not found");
    }

    existing.name = record.name;
    existing.email = record.email;
    existing.phone = record.phone;
    existing.birthDate = record.birthDate;
    existing.document = record.document;
    existing.password = record.password;
    existing.status = record.status;

    const saved = await withRetry(() => this.repository.save(existing));

    return this.toSavedRecord(saved);
  }

  async findById(publicId: string): Promise<Client | null> {
    const entity = await withRetry(() =>
      this.repository.findOneBy({ publicId }),
    );

    return entity ? this.toDomain(entity) : null;
  }

  async findByDocument(document: string): Promise<Client | null> {
    const entity = await withRetry(() =>
      this.repository.findOneBy({ document }),
    );

    return entity ? this.toDomain(entity) : null;
  }

  private toSavedRecord(saved: ClientEntity): SavedClientRecord {
    return {
      id: saved.id,
      publicId: saved.publicId,
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

  private toDomain(entity: ClientEntity): Client {
    const result = Client.reconstitute({
      id: entity.publicId,
      name: entity.name,
      email: entity.email,
      phone: entity.phone,
      birthDate: entity.birthDate,
      document: entity.document,
      password: entity.password,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });

    if (result.isFailure) {
      throw new Error(
        `Invalid persisted client ${entity.publicId}: ${result.getError()}`,
      );
    }

    return result.getValue();
  }
}
