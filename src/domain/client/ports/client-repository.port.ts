export type ClientPersistenceRecord = {
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

export abstract class ClientRepositoryPort {
  abstract save(record: ClientPersistenceRecord): Promise<SavedClientRecord>;
}
