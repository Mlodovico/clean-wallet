import { Repository } from "typeorm";

import { BalanceEntity } from "../../domain/balance/balance.entity";
import { BalanceRepository } from "./BalanceRepository";

describe("BalanceRepository", () => {
  it("saves a balance record", async () => {
    const savedEntity = {
      id: "balance-id",
      amount: 150.75,
      overdraftLimit: 50,
      currency: "BRL",
      transactionType: "deposit",
      transactionId: "txn-abc-123",
      description: "Initial balance",
      createdAt: new Date("2026-01-01"),
      updatedAt: new Date("2026-01-01"),
    };

    const typeOrmRepository = {
      save: jest.fn().mockResolvedValue(savedEntity),
    } as unknown as Repository<BalanceEntity>;

    const repository = new BalanceRepository(typeOrmRepository);
    const result = await repository.save({
      id: savedEntity.id,
      amount: savedEntity.amount,
      overdraftLimit: savedEntity.overdraftLimit,
      currency: savedEntity.currency,
      transactionType: savedEntity.transactionType,
      transactionId: savedEntity.transactionId,
      description: savedEntity.description,
    });

    expect(typeOrmRepository.save).toHaveBeenCalled();
    expect(result).toEqual(savedEntity);
  });
});
