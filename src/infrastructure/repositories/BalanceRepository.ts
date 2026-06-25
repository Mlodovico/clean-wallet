import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { BalanceEntity } from "../../domain/balance/balance.entity";
import {
  BalancePersistenceRecord,
  BalanceRepositoryPort,
  SavedBalanceRecord,
} from "../../domain/balance/ports/balance-repository.port";

@Injectable()
export class BalanceRepository implements BalanceRepositoryPort {
  constructor(
    @InjectRepository(BalanceEntity)
    private readonly repository: Repository<BalanceEntity>,
  ) {}

  async save(record: BalancePersistenceRecord): Promise<SavedBalanceRecord> {
    const saved = await this.repository.save(record);

    return {
      id: saved.id,
      amount: Number(saved.amount),
      overdraftLimit: Number(saved.overdraftLimit),
      currency: saved.currency,
      transactionType: saved.transactionType,
      transactionId: saved.transactionId,
      description: saved.description,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    };
  }
}
