export type BalancePersistenceRecord = {
    id: string;
    amount: number;
    overdraftLimit: number;
    currency: string;
    transactionType: string;
    transactionId: string;
    description: string;
};
export type SavedBalanceRecord = BalancePersistenceRecord & {
    createdAt: Date;
    updatedAt: Date;
};
export declare abstract class BalanceRepositoryPort {
    abstract save(record: BalancePersistenceRecord): Promise<SavedBalanceRecord>;
}
