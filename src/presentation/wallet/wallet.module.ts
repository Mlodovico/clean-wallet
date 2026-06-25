import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CreateWalletUseCase } from "../../application/wallet/create-wallet.use-case";
import { WalletEntity } from "../../domain/wallet/wallet.entity";
import { WalletRepositoryPort } from "../../domain/wallet/ports/wallet-repository.port";
import { WalletRepository } from "../../infrastructure/repositories/WalletRepository";
import { WalletController } from "./wallet.controller";
import { WalletService } from "./wallet.service";

@Module({
  imports: [TypeOrmModule.forFeature([WalletEntity])],
  controllers: [WalletController],
  providers: [
    WalletService,
    CreateWalletUseCase,
    {
      provide: WalletRepositoryPort,
      useClass: WalletRepository,
    },
  ],
  exports: [WalletService, CreateWalletUseCase],
})
export class WalletModule {}
