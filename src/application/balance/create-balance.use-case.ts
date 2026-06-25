import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";

import { Balance } from "../../domain/balance/Balance";
import {
  BalancePersistenceRecord,
  BalanceRepositoryPort,
} from "../../domain/balance/ports/balance-repository.port";

export type CreateBalanceInput = {
  amount: number;
  overdraftLimit: number;
  currency: string;
  transactionType: string;
  transactionId: string;
  description: string;
};

@Injectable()
export class CreateBalanceUseCase {
  constructor(private readonly balanceRepository: BalanceRepositoryPort) {}

  async execute(input: CreateBalanceInput): Promise<Balance> {
    const balanceResult = Balance.create(input);

    if (balanceResult.isFailure) {
      throw new BadRequestException(balanceResult.getError());
    }

    const balance = balanceResult.getValue();

    try {
      await this.balanceRepository.save(this.toPersistenceRecord(balance));
    } catch {
      throw new InternalServerErrorException("Failed to create balance");
    }

    return balance;
  }

  private toPersistenceRecord(balance: Balance): BalancePersistenceRecord {
    return {
      id: balance.id.getValue(),
      amount: balance.amount.getValue(),
      overdraftLimit: balance.overdraftLimit.getValue(),
      currency: balance.currency.getValue(),
      transactionType: balance.transactionType.getValue(),
      transactionId: balance.transactionId.getValue(),
      description: balance.description.getValue(),
    };
  }
}
