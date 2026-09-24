import { Client } from "../../domain/client/Client";
import { ClientRepositoryPort } from "../../domain/client/ports/client-repository.port";
export declare class GetClientUseCase {
    private readonly clientRepository;
    constructor(clientRepository: ClientRepositoryPort);
    execute(id: string): Promise<Client>;
}
