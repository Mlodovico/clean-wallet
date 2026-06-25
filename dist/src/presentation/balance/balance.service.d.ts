import { CreateBalanceInput, CreateBalanceUseCase } from "../../application/balance/create-balance.use-case";
import { Balance } from "../../domain/balance/Balance";
export declare class BalanceService {
    private readonly createBalanceUseCase;
    private balances;
    constructor(createBalanceUseCase: CreateBalanceUseCase);
    findAll(): Balance[];
    create(balanceData: CreateBalanceInput): Promise<Balance>;
}
