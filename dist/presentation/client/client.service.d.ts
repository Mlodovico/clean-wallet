import { CreateClientInput, CreateClientUseCase } from "../../application/client/create-client.use-case";
import { GetClientUseCase } from "../../application/client/get-client.use-case";
import { UpdateClientInput, UpdateClientUseCase } from "../../application/client/update-client.use-case";
import { Client } from "../../domain/client/Client";
export declare class ClientService {
    private readonly createClientUseCase;
    private readonly getClientUseCase;
    private readonly updateClientUseCase;
    private clients;
    constructor(createClientUseCase: CreateClientUseCase, getClientUseCase: GetClientUseCase, updateClientUseCase: UpdateClientUseCase);
    findAll(): Client[];
    create(clientData: CreateClientInput): Promise<Client>;
    findOne(id: string): Promise<Client>;
    update(id: string, updateData: Omit<UpdateClientInput, "id">): Promise<Client>;
}
