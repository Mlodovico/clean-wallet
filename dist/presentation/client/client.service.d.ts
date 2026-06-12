import { Client } from "../../domain/client/Client";
export declare class ClientService {
    private clients;
    findAll(): Client[];
    create(clientData: Client): Client;
    findOne(id: string): Client | undefined;
    update(id: string, updateData: Partial<Client>): Client | undefined;
}
