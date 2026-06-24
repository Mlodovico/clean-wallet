import { Repository } from "typeorm";
import { Client } from "./client.entity";
export declare class ClientRepository {
    private readonly repository;
    constructor(repository: Repository<Client>);
    create(client: Partial<Client>): Promise<Client>;
    findAll(): Promise<Client[]>;
    findOne(id: number): Promise<Client | null>;
}
