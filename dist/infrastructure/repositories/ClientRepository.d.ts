import { Repository } from "typeorm";
import { Client } from "../../domain/client/client.entity";
export declare class ClientRepository {
    private readonly clientRepository;
    constructor(clientRepository: Repository<Client>);
    create(client: Partial<Client>): Promise<Client>;
    findAll(): Promise<Client[]>;
    findOne(id: number): Promise<Client | null>;
}
