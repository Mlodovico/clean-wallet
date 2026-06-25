import { Repository } from "typeorm";
import { BalanceEntity } from "../../domain/balance/balance.entity";
import { BalancePersistenceRecord, BalanceRepositoryPort, SavedBalanceRecord } from "../../domain/balance/ports/balance-repository.port";
export declare class BalanceRepository implements BalanceRepositoryPort {
    private readonly repository;
    constructor(repository: Repository<BalanceEntity>);
    save(record: BalancePersistenceRecord): Promise<SavedBalanceRecord>;
}
