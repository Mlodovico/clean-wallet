import { Repository } from "typeorm";

import { WalletEntity } from "../../domain/wallet/wallet.entity";
import { WalletRepository } from "./WalletRepository";

describe("WalletRepository", () => {
  it("saves a wallet record", async () => {
    const savedEntity = {
      id: "wallet-id",
      clientId: "550e8400-e29b-41d4-a716-446655440000",
      walletType: "personal",
      currency: 986,
      walletLimit: 5000,
      createdAt: new Date("2026-01-01"),
      updatedAt: new Date("2026-01-01"),
    };

    const typeOrmRepository = {
      save: jest.fn().mockResolvedValue(savedEntity),
    } as unknown as Repository<WalletEntity>;

    const repository = new WalletRepository(typeOrmRepository);
    const result = await repository.save({
      id: savedEntity.id,
      clientId: savedEntity.clientId,
      walletType: savedEntity.walletType,
      currency: savedEntity.currency,
      walletLimit: savedEntity.walletLimit,
    });

    expect(typeOrmRepository.save).toHaveBeenCalled();
    expect(result).toEqual(savedEntity);
  });
});
