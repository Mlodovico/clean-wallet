import { BadRequestException, NotFoundException } from "@nestjs/common";

import { validCreateClientInput } from "../../testing/fixtures/domain.fixtures";
import { Client } from "../../domain/client/Client";
import { ClientRepositoryPort } from "../../domain/client/ports/client-repository.port";
import { GetClientUseCase } from "./get-client.use-case";

const PUBLIC_ID = "550e8400-e29b-41d4-a716-446655440000";

describe("GetClientUseCase", () => {
  let useCase: GetClientUseCase;
  let repository: jest.Mocked<ClientRepositoryPort>;
  let client: Client;

  beforeEach(() => {
    client = Client.reconstitute({
      ...validCreateClientInput,
      id: PUBLIC_ID,
      birthDate: validCreateClientInput.birthDate as Date,
      createdAt: new Date("2026-01-01"),
      updatedAt: new Date("2026-01-01"),
    }).getValue();

    repository = {
      save: jest.fn(),
      update: jest.fn(),
      findById: jest.fn().mockResolvedValue(client),
      findByDocument: jest.fn(),
    };

    useCase = new GetClientUseCase(repository);
  });

  it("returns the client found by public id", async () => {
    const found = await useCase.execute(PUBLIC_ID);

    expect(repository.findById).toHaveBeenCalledWith(PUBLIC_ID);
    expect(found).toBe(client);
  });

  it("throws BadRequestException when the public id is invalid", async () => {
    await expect(useCase.execute("not-a-uuid")).rejects.toBeInstanceOf(
      BadRequestException,
    );

    expect(repository.findById).not.toHaveBeenCalled();
  });

  it("throws NotFoundException when the client does not exist", async () => {
    repository.findById.mockResolvedValue(null);

    await expect(useCase.execute(PUBLIC_ID)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
