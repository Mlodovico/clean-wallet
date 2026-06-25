import { Body, Controller, Get, Post } from "@nestjs/common";

import { CreateWalletInput } from "../../application/wallet/create-wallet.use-case";
import { Wallet } from "../../domain/wallet/Wallet";
import { WalletService } from "./wallet.service";

@Controller("wallets")
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  findAll(): Wallet[] {
    return this.walletService.findAll();
  }

  @Post()
  create(@Body() createWalletDto: CreateWalletInput): Promise<Wallet> {
    return this.walletService.create(createWalletDto);
  }
}
