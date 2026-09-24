import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";

import {
  anotherValidDocument,
  validCreateClientInput,
} from "../../testing/fixtures/domain.fixtures";
import { Client } from "../../domain/client/Client";
import { ClientRepositoryPort } from "../../domain/client/ports/client-repository.port";
import { CreateClientUseCase } from "./create-client.use-case";

describe("CreateClientUseCase", () => {
  let useCase: CreateClientUseCase;
  let repository: jest.Mocked<ClientRepositoryPort>;

  beforeEach(() => {
    repository = {
      save: jest.fn().mockResolvedValue({
        id: 1,
        publicId: "550e8400-e29b-41d4-a716-446655440000",
        ...validCreateClientInput,
        birthDate: validCreateClientInput.birthDate as Date,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      update: jest.fn(),
      findById: jest.fn(),
      findByDocument: jest.fn().mockResolvedValue(null),
    };

    useCase = new CreateClientUseCase(repository);
  });

  it("creates and persists a client with a public id", async () => {
    const client = await useCase.execute(validCreateClientInput);

    expect(client.name.getValue()).toBe("Murilo Lodovico");
    expect(client.id.getValue()).toBe("550e8400-e29b-41d4-a716-446655440000");
    expect(repository.findByDocument).toHaveBeenCalledWith(
      validCreateClientInput.document,
    );
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        publicId: "550e8400-e29b-41d4-a716-446655440000",
        name: "Murilo Lodovico",
        email: "murilo@example.com",
        document: validCreateClientInput.document,
        status: "active",
      }),
    );
  });

  it("parses birthDate when provided as string", async () => {
    await useCase.execute({
      ...validCreateClientInput,
      birthDate: "1990-05-15",
    });

    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        birthDate: new Date("1990-05-15"),
      }),
    );
  });

  it("throws BadRequestException for invalid input", async () => {
    await expect(
      useCase.execute({
        ...validCreateClientInput,
        email: "invalid-email",
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(repository.save).not.toHaveBeenCalled();
  });

  it("throws ConflictException when document is already in use", async () => {
    const existing = Client.reconstitute({
      ...validCreateClientInput,
      id: "11111111-1111-4111-8111-111111111111",
      document: anotherValidDocument,
      birthDate: validCreateClientInput.birthDate as Date,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).getValue();

    repository.findByDocument.mockResolvedValue(existing);

    await expect(
      useCase.execute(validCreateClientInput),
    ).rejects.toBeInstanceOf(ConflictException);
    expect(repository.save).not.toHaveBeenCalled();
  });

  it("throws InternalServerErrorException when repository fails", async () => {
    repository.save.mockRejectedValue(new Error("db down"));

    await expect(
      useCase.execute(validCreateClientInput),
    ).rejects.toBeInstanceOf(InternalServerErrorException);
  });
});
