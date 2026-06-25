import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CreateBalanceUseCase } from "../../application/balance/create-balance.use-case";
import { BalanceEntity } from "../../domain/balance/balance.entity";
import { BalanceRepositoryPort } from "../../domain/balance/ports/balance-repository.port";
import { BalanceRepository } from "../../infrastructure/repositories/BalanceRepository";
import { BalanceController } from "./balance.controller";
import { BalanceService } from "./balance.service";

@Module({
  imports: [TypeOrmModule.forFeature([BalanceEntity])],
  controllers: [BalanceController],
  providers: [
    BalanceService,
    CreateBalanceUseCase,
    {
      provide: BalanceRepositoryPort,
      useClass: BalanceRepository,
    },
  ],
  exports: [BalanceService, CreateBalanceUseCase],
})
export class BalanceModule {}
