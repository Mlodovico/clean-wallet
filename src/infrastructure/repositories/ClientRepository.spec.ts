import { Repository } from "typeorm";

import { Client } from "../../domain/client/Client";
import { Client as ClientEntity } from "../../domain/client/client.entity";
import { ClientRepository } from "./ClientRepository";

const PUBLIC_ID = "550e8400-e29b-41d4-a716-446655440000";

const savedEntity = {
  id: 1,
  publicId: PUBLIC_ID,
  name: "Murilo Lodovico",
  email: "murilo@example.com",
  phone: "11999999999",
  birthDate: new Date("1990-05-15"),
  document: "52998224725",
  password: "Password1!",
  status: "active",
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date("2026-01-01"),
};

describe("ClientRepository", () => {
  let typeOrmRepository: {
    save: jest.Mock;
    findOneBy: jest.Mock;
  };
  let repository: ClientRepository;

  beforeEach(() => {
    typeOrmRepository = {
      save: jest.fn().mockResolvedValue(savedEntity),
      findOneBy: jest.fn(),
    };
    repository = new ClientRepository(
      typeOrmRepository as unknown as Repository<ClientEntity>,
    );
  });

  it("saves a client record including the public id", async () => {
    const result = await repository.save({
      publicId: savedEntity.publicId,
      name: savedEntity.name,
      email: savedEntity.email,
      phone: savedEntity.phone,
      birthDate: savedEntity.birthDate,
      document: savedEntity.document,
      password: savedEntity.password,
      status: savedEntity.status,
    });

    expect(typeOrmRepository.save).toHaveBeenCalled();
    expect(result).toEqual(savedEntity);
  });

  it("finds a client by public id", async () => {
    typeOrmRepository.findOneBy.mockResolvedValue(savedEntity);

    const result = await repository.findById(PUBLIC_ID);

    expect(typeOrmRepository.findOneBy).toHaveBeenCalledWith({
      publicId: PUBLIC_ID,
    });
    expect(result).toBeInstanceOf(Client);
    expect(result?.id.getValue()).toBe(PUBLIC_ID);
    expect(result?.document.getValue()).toBe(savedEntity.document);
  });

  it("returns null when no client matches the public id", async () => {
    typeOrmRepository.findOneBy.mockResolvedValue(null);

    await expect(repository.findById(PUBLIC_ID)).resolves.toBeNull();
  });

  it("finds a client by document", async () => {
    typeOrmRepository.findOneBy.mockResolvedValue(savedEntity);

    const result = await repository.findByDocument(savedEntity.document);

    expect(typeOrmRepository.findOneBy).toHaveBeenCalledWith({
      document: savedEntity.document,
    });
    expect(result).toBeInstanceOf(Client);
    expect(result?.document.getValue()).toBe(savedEntity.document);
  });

  it("returns null when no client matches the document", async () => {
    typeOrmRepository.findOneBy.mockResolvedValue(null);

    await expect(
      repository.findByDocument(savedEntity.document),
    ).resolves.toBeNull();
  });

  it("updates an existing client found by public id", async () => {
    const existing = { ...savedEntity };
    const updatedEntity = {
      ...savedEntity,
      name: "Jane Doe",
      updatedAt: new Date("2026-02-01"),
    };

    typeOrmRepository.findOneBy.mockResolvedValue(existing);
    typeOrmRepository.save.mockResolvedValue(updatedEntity);

    const result = await repository.update(PUBLIC_ID, {
      publicId: PUBLIC_ID,
      name: "Jane Doe",
      email: savedEntity.email,
      phone: savedEntity.phone,
      birthDate: savedEntity.birthDate,
      document: savedEntity.document,
      password: savedEntity.password,
      status: savedEntity.status,
    });

    expect(typeOrmRepository.findOneBy).toHaveBeenCalledWith({
      publicId: PUBLIC_ID,
    });
    expect(existing.name).toBe("Jane Doe");
    expect(result).toEqual(updatedEntity);
  });

  it("throws when updating a missing client", async () => {
    typeOrmRepository.findOneBy.mockResolvedValue(null);

    await expect(
      repository.update(PUBLIC_ID, {
        publicId: PUBLIC_ID,
        name: savedEntity.name,
        email: savedEntity.email,
        phone: savedEntity.phone,
        birthDate: savedEntity.birthDate,
        document: savedEntity.document,
        password: savedEntity.password,
        status: savedEntity.status,
      }),
    ).rejects.toThrow("Client not found");
  });

  it("throws when persisted data cannot be mapped to the domain", async () => {
    typeOrmRepository.findOneBy.mockResolvedValue({
      ...savedEntity,
      email: "invalid-email",
    });

    await expect(repository.findById(PUBLIC_ID)).rejects.toThrow(
      /Invalid persisted client/,
    );
  });
});
