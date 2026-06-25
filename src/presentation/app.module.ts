import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BalanceModule } from "./balance/balance.module";
import { ClientModule } from "./client/client.module";
import { WalletModule } from "./wallet/wallet.module";
import { DatabaseModule } from "../infrastructure/database/database.module";

@Module({
  imports: [ClientModule, BalanceModule, WalletModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
