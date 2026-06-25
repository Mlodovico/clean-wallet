import { CreateClientInput } from "../../application/client/create-client.use-case";
import { Client } from "../../domain/client/Client";
import { ClientService } from "./client.service";
export declare class ClientController {
    private readonly clientService;
    constructor(clientService: ClientService);
    findAll(): Client[];
    createNewClient(newClient: CreateClientInput): Promise<Client>;
    updateClient(id: string, updateData: Partial<Client>): Client | undefined;
    findById(id: string): Client | undefined;
}
