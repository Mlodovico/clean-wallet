import { Client } from "../../domain/client/Client";
import { ClientRepositoryPort } from "../../domain/client/ports/client-repository.port";
export type CreateClientInput = {
    name: string;
    phone: string;
    email: string;
    birthDate: Date | string;
    document: string;
    password: string;
    status: string;
};
export declare class CreateClientUseCase {
    private readonly clientRepository;
    constructor(clientRepository: ClientRepositoryPort);
    execute(input: CreateClientInput): Promise<Client>;
    private toPersistenceRecord;
}
