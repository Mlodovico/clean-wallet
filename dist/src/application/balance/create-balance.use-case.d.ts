import { Balance } from "../../domain/balance/Balance";
import { BalanceRepositoryPort } from "../../domain/balance/ports/balance-repository.port";
export type CreateBalanceInput = {
    amount: number;
    overdraftLimit: number;
    currency: string;
    transactionType: string;
    transactionId: string;
    description: string;
};
export declare class CreateBalanceUseCase {
    private readonly balanceRepository;
    constructor(balanceRepository: BalanceRepositoryPort);
    execute(input: CreateBalanceInput): Promise<Balance>;
    private toPersistenceRecord;
}
