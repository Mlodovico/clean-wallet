import { Repository } from "typeorm";
import { WalletEntity } from "../../domain/wallet/wallet.entity";
import { WalletPersistenceRecord, WalletRepositoryPort, SavedWalletRecord } from "../../domain/wallet/ports/wallet-repository.port";
export declare class WalletRepository implements WalletRepositoryPort {
    private readonly repository;
    constructor(repository: Repository<WalletEntity>);
    save(record: WalletPersistenceRecord): Promise<SavedWalletRecord>;
}
