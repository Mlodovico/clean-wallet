import { ClientService } from './client.service';
import { Client } from '../../domain/client/Client';
export declare class ClientController {
    private readonly clientService;
    constructor(clientService: ClientService);
    findAll(): Client[];
    CreateNewClient(newClient: Client): Client;
    updateClient(id: string, updateData: Partial<Client>): Client | undefined;
    findById(id: string): Client | undefined;
}
