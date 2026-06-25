import { Injectable } from "@nestjs/common";

import {
  CreateWalletInput,
  CreateWalletUseCase,
} from "../../application/wallet/create-wallet.use-case";
import { Wallet } from "../../domain/wallet/Wallet";

@Injectable()
export class WalletService {
  private wallets: Wallet[] = [];

  constructor(private readonly createWalletUseCase: CreateWalletUseCase) {}

  findAll(): Wallet[] {
    return this.wallets;
  }

  async create(walletData: CreateWalletInput): Promise<Wallet> {
    const newWallet = await this.createWalletUseCase.execute(walletData);
    this.wallets.push(newWallet);
    return newWallet;
  }
}
