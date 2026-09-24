import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

import {
  anotherValidDocument,
  validCreateClientInput,
} from "../../testing/fixtures/domain.fixtures";
import { Client } from "../../domain/client/Client";
import { ClientRepositoryPort } from "../../domain/client/ports/client-repository.port";
import { UpdateClientUseCase } from "./update-client.use-case";

const PUBLIC_ID = "550e8400-e29b-41d4-a716-446655440000";

const createClient = (): Client =>
  Client.reconstitute({
    ...validCreateClientInput,
    id: PUBLIC_ID,
    birthDate: validCreateClientInput.birthDate as Date,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  }).getValue();

describe("UpdateClientUseCase", () => {
  let useCase: UpdateClientUseCase;
  let repository: jest.Mocked<ClientRepositoryPort>;
  let client: Client;

  beforeEach(() => {
    client = createClient();
    repository = {
      save: jest.fn(),
      update: jest.fn().mockResolvedValue({
        id: 1,
        publicId: PUBLIC_ID,
        ...validCreateClientInput,
        name: "Jane Doe",
        birthDate: validCreateClientInput.birthDate as Date,
        createdAt: client.createdAt,
        updatedAt: new Date(),
      }),
      findById: jest.fn().mockResolvedValue(client),
      findByDocument: jest.fn().mockResolvedValue(null),
    };

    useCase = new UpdateClientUseCase(repository);
  });

  it("loads the client by public id and updates the provided fields", async () => {
    const updated = await useCase.execute({
      id: PUBLIC_ID,
      name: "Jane Doe",
    });

    expect(repository.findById).toHaveBeenCalledWith(PUBLIC_ID);
    expect(repository.findByDocument).not.toHaveBeenCalled();
    expect(updated.name.getValue()).toBe("Jane Doe");
    expect(updated.document.getValue()).toBe(validCreateClientInput.document);
    expect(repository.update).toHaveBeenCalledWith(
      PUBLIC_ID,
      expect.objectContaining({
        publicId: PUBLIC_ID,
        name: "Jane Doe",
        document: validCreateClientInput.document,
      }),
    );
  });

  it("throws BadRequestException when the public id is invalid", async () => {
    await expect(
      useCase.execute({ id: "not-a-uuid", name: "Jane Doe" }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(repository.findById).not.toHaveBeenCalled();
  });

  it("throws NotFoundException when the client does not exist", async () => {
    repository.findById.mockResolvedValue(null);

    await expect(
      useCase.execute({ id: PUBLIC_ID, name: "Jane Doe" }),
    ).rejects.toBeInstanceOf(NotFoundException);

    expect(repository.update).not.toHaveBeenCalled();
  });

  it("changes the document when no other client uses it", async () => {
    const updated = await useCase.execute({
      id: PUBLIC_ID,
      document: anotherValidDocument,
    });

    expect(repository.findByDocument).toHaveBeenCalledWith(
      anotherValidDocument,
    );
    expect(updated.document.getValue()).toBe(anotherValidDocument);
    expect(repository.update).toHaveBeenCalledWith(
      PUBLIC_ID,
      expect.objectContaining({
        document: anotherValidDocument,
      }),
    );
  });

  it("does not look up document uniqueness when the document is unchanged", async () => {
    await useCase.execute({
      id: PUBLIC_ID,
      document: validCreateClientInput.document,
    });

    expect(repository.findByDocument).not.toHaveBeenCalled();
  });

  it("rejects a document change when another client already uses it", async () => {
    const otherClient = Client.reconstitute({
      ...validCreateClientInput,
      id: "11111111-1111-4111-8111-111111111111",
      document: anotherValidDocument,
      birthDate: validCreateClientInput.birthDate as Date,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).getValue();

    repository.findByDocument.mockResolvedValue(otherClient);

    await expect(
      useCase.execute({
        id: PUBLIC_ID,
        document: anotherValidDocument,
      }),
    ).rejects.toBeInstanceOf(ConflictException);

    expect(repository.findByDocument).toHaveBeenCalledWith(
      anotherValidDocument,
    );
    expect(repository.update).not.toHaveBeenCalled();
  });

  it("throws BadRequestException when the new document is invalid", async () => {
    await expect(
      useCase.execute({
        id: PUBLIC_ID,
        document: "invalid",
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(repository.update).not.toHaveBeenCalled();
  });

  it("throws BadRequestException when updated fields are invalid", async () => {
    await expect(
      useCase.execute({
        id: PUBLIC_ID,
        email: "invalid-email",
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(repository.update).not.toHaveBeenCalled();
  });

  it("throws InternalServerErrorException when repository update fails", async () => {
    repository.update.mockRejectedValue(new Error("db down"));

    await expect(
      useCase.execute({ id: PUBLIC_ID, name: "Jane Doe" }),
    ).rejects.toBeInstanceOf(InternalServerErrorException);
  });
});
