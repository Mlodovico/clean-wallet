import { Body, Controller, Get, Post } from "@nestjs/common";

import { CreateBalanceInput } from "../../application/balance/create-balance.use-case";
import { Balance } from "../../domain/balance/Balance";
import { BalanceService } from "./balance.service";

@Controller("balances")
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  findAll(): Balance[] {
    return this.balanceService.findAll();
  }

  @Post()
  create(@Body() createBalanceDto: CreateBalanceInput): Promise<Balance> {
    return this.balanceService.create(createBalanceDto);
  }
}
