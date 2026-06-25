import { Repository } from "typeorm";
import { Client as ClientEntity } from "../../domain/client/client.entity";
import { ClientPersistenceRecord, ClientRepositoryPort, SavedClientRecord } from "../../domain/client/ports/client-repository.port";
export declare class ClientRepository implements ClientRepositoryPort {
    private readonly repository;
    constructor(repository: Repository<ClientEntity>);
    save(record: ClientPersistenceRecord): Promise<SavedClientRecord>;
}
