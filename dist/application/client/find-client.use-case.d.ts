import { Client } from "../../domain/client/Client";
import { ClientRepositoryPort } from "../../domain/client/ports/client-repository.port";
export type FindClientInput = {
    document?: string;
    email?: string;
};
export declare class FindClientUseCase {
    private readonly clientRepository;
    constructor(clientRepository: ClientRepositoryPort);
    execute(input: FindClientInput): Promise<Client>;
    private findByDocument;
    private findByEmail;
}
