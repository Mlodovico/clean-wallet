import { Client } from "../../domain/client/Client";
import { ClientPersistenceRecord, ClientRepositoryPort } from "../../domain/client/ports/client-repository.port";
export declare const findClientOrFail: (clientRepository: ClientRepositoryPort, id: string) => Promise<Client>;
export declare const toClientPersistenceRecord: (client: Client) => ClientPersistenceRecord;
