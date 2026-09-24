import { Client } from "../../domain/client/Client";
import { ClientRepositoryPort } from "../../domain/client/ports/client-repository.port";
export type UpdateClientInput = {
    id: string;
    name?: string;
    phone?: string;
    email?: string;
    birthDate?: Date | string;
    document?: string;
    password?: string;
    status?: string;
};
export declare class UpdateClientUseCase {
    private readonly clientRepository;
    constructor(clientRepository: ClientRepositoryPort);
    execute(input: UpdateClientInput): Promise<Client>;
    private toPersistenceRecord;
}
