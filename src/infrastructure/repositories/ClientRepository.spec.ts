import { Repository } from "typeorm";

import { Client as ClientEntity } from "../../domain/client/client.entity";
import { ClientRepository } from "./ClientRepository";

describe("ClientRepository", () => {
  it("saves a client record", async () => {
    const savedEntity = {
      id: 1,
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

    const typeOrmRepository = {
      save: jest.fn().mockResolvedValue(savedEntity),
    } as unknown as Repository<ClientEntity>;

    const repository = new ClientRepository(typeOrmRepository);
    const result = await repository.save({
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
});
