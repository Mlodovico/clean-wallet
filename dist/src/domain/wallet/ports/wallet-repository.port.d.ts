export type WalletPersistenceRecord = {
    id: string;
    clientId: string;
    walletType: string;
    currency: number;
    walletLimit: number;
};
export type SavedWalletRecord = WalletPersistenceRecord & {
    createdAt: Date;
    updatedAt: Date;
};
export declare abstract class WalletRepositoryPort {
    abstract save(record: WalletPersistenceRecord): Promise<SavedWalletRecord>;
}
