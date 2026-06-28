import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { withRetry } from "../../shared/resilience/retry";
import { WalletEntity } from "../../domain/wallet/wallet.entity";
import {
  WalletPersistenceRecord,
  WalletRepositoryPort,
  SavedWalletRecord,
} from "../../domain/wallet/ports/wallet-repository.port";

@Injectable()
export class WalletRepository implements WalletRepositoryPort {
  constructor(
    @InjectRepository(WalletEntity)
    private readonly repository: Repository<WalletEntity>,
  ) {}

  async save(record: WalletPersistenceRecord): Promise<SavedWalletRecord> {
    const saved = await withRetry(() => this.repository.save(record));

    return {
      id: saved.id,
      clientId: saved.clientId,
      walletType: saved.walletType,
      currency: saved.currency,
      walletLimit: Number(saved.walletLimit),
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    };
  }
}
