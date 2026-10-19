import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Client } from "../../domain/client/Client";
import { Client as ClientEntity } from "../../domain/client/client.entity";
import {
  ClientPersistenceRecord,
  ClientRepositoryPort,
  SavedClientRecord,
} from "../../domain/client/ports/client-repository.port";
import { withRetry } from "../../shared/resilience/retry";
import { transactionContext } from "../database/transaction-context";

@Injectable()
export class ClientRepository implements ClientRepositoryPort {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly repository: Repository<ClientEntity>,
  ) {}

  async save(record: ClientPersistenceRecord): Promise<SavedClientRecord> {
    const saved = await this.execute(() => this.repo.save(record));

    return this.toSavedRecord(saved);
  }

  async update(
    publicId: string,
    record: ClientPersistenceRecord,
  ): Promise<SavedClientRecord> {
    const existing = await this.execute(() =>
      this.repo.findOneBy({ publicId }),
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

    const saved = await this.execute(() => this.repo.save(existing));

    return this.toSavedRecord(saved);
  }

  async findById(publicId: string): Promise<Client | null> {
    const entity = await this.execute(() =>
      this.repo.findOneBy({ publicId }),
    );

    return entity ? this.toDomain(entity) : null;
  }

  async findByDocument(document: string): Promise<Client | null> {
    const entity = await this.execute(() =>
      this.repo.findOneBy({ document }),
    );

    return entity ? this.toDomain(entity) : null;
  }

  async findByEmail(email: string): Promise<Client | null> {
    const entity = await this.execute(() => this.repo.findOneBy({ email }));

    return entity ? this.toDomain(entity) : null;
  }

  private get repo(): Repository<ClientEntity> {
    return (
      transactionContext.getStore()?.getRepository(ClientEntity) ??
      this.repository
    );
  }

  private execute<T>(operation: () => Promise<T>): Promise<T> {
    if (transactionContext.getStore()) {
      return operation();
    }

    return withRetry(operation);
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
      passwordHash: entity.password,
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
