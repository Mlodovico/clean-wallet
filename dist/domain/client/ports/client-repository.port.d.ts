import { Client } from "../Client";
export type ClientPersistenceRecord = {
    publicId: string;
    name: string;
    email: string;
    phone: string;
    birthDate: Date;
    document: string;
    password: string;
    status: string;
};
export type SavedClientRecord = ClientPersistenceRecord & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
};
export declare abstract class ClientRepositoryPort {
    abstract save(record: ClientPersistenceRecord): Promise<SavedClientRecord>;
    abstract update(publicId: string, record: ClientPersistenceRecord): Promise<SavedClientRecord>;
    abstract findById(publicId: string): Promise<Client | null>;
    abstract findByDocument(document: string): Promise<Client | null>;
}
