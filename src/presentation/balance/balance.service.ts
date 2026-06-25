import { Injectable } from "@nestjs/common";

import {
  CreateBalanceInput,
  CreateBalanceUseCase,
} from "../../application/balance/create-balance.use-case";
import { Balance } from "../../domain/balance/Balance";

@Injectable()
export class BalanceService {
  private balances: Balance[] = [];

  constructor(private readonly createBalanceUseCase: CreateBalanceUseCase) {}

  findAll(): Balance[] {
    return this.balances;
  }

  async create(balanceData: CreateBalanceInput): Promise<Balance> {
    const newBalance = await this.createBalanceUseCase.execute(balanceData);
    this.balances.push(newBalance);
    return newBalance;
  }
}
