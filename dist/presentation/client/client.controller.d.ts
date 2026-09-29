import { CreateClientInput } from "../../application/client/create-client.use-case";
import { FindClientInput } from "../../application/client/find-client.use-case";
import { UpdateClientInput } from "../../application/client/update-client.use-case";
import { Client } from "../../domain/client/Client";
import { ClientService } from "./client.service";
export declare class ClientController {
    private readonly clientService;
    constructor(clientService: ClientService);
    findAll(): Client[];
    createNewClient(newClient: CreateClientInput): Promise<Client>;
    findBy(criteria: FindClientInput): Promise<Client>;
    updateClient(id: string, updateData: Omit<UpdateClientInput, "id">): Promise<Client>;
    activate(id: string): Promise<Client>;
    suspend(id: string): Promise<Client>;
    deactivate(id: string): Promise<Client>;
    changePassword(id: string, body: {
        currentPassword: string;
        newPassword: string;
    }): Promise<void>;
    findById(id: string): Promise<Client>;
}
