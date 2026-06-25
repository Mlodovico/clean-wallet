import {
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";

import { validCreateClientInput } from "../../testing/fixtures/domain.fixtures";
import { ClientRepositoryPort } from "../../domain/client/ports/client-repository.port";
import { CreateClientUseCase } from "./create-client.use-case";

describe("CreateClientUseCase", () => {
  let useCase: CreateClientUseCase;
  let repository: jest.Mocked<ClientRepositoryPort>;

  beforeEach(() => {
    repository = {
      save: jest.fn().mockResolvedValue({
        id: 1,
        ...validCreateClientInput,
        birthDate: validCreateClientInput.birthDate as Date,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    };

    useCase = new CreateClientUseCase(repository);
  });

  it("creates and persists a client", async () => {
    const client = await useCase.execute(validCreateClientInput);

    expect(client.name.getValue()).toBe("Murilo Lodovico");
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Murilo Lodovico",
        email: "murilo@example.com",
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

  it("throws InternalServerErrorException when repository fails", async () => {
    repository.save.mockRejectedValue(new Error("db down"));

    await expect(
      useCase.execute(validCreateClientInput),
    ).rejects.toBeInstanceOf(InternalServerErrorException);
  });
});
