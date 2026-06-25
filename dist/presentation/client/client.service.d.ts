import { CreateClientInput, CreateClientUseCase } from "../../application/client/create-client.use-case";
import { Client } from "../../domain/client/Client";
export declare class ClientService {
    private readonly createClientUseCase;
    private clients;
    constructor(createClientUseCase: CreateClientUseCase);
    findAll(): Client[];
    create(clientData: CreateClientInput): Promise<Client>;
    findOne(id: string): Client | undefined;
    update(id: string, updateData: Partial<Client>): Client | undefined;
}
