import { CreateBalanceInput } from "../../application/balance/create-balance.use-case";
import { Balance } from "../../domain/balance/Balance";
import { BalanceService } from "./balance.service";
export declare class BalanceController {
    private readonly balanceService;
    constructor(balanceService: BalanceService);
    findAll(): Balance[];
    create(createBalanceDto: CreateBalanceInput): Promise<Balance>;
}
