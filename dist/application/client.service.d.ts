import { ClientRepository } from "../domain/client/client.repository";
import { Client } from "../domain/client/client.entity";
export declare class ClientService {
    private readonly clientRepository;
    constructor(clientRepository: ClientRepository);
    create(client: Partial<Client>): Promise<Client>;
    findAll(): Promise<Client[]>;
    findOne(id: number): Promise<Client>;
}
