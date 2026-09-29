import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";

import {
  CLIENT_PUBLIC_ID,
  anotherValidDocument,
  buildClient,
  validCreateClientInput,
} from "../../testing/fixtures/domain.fixtures";
import {
  mockClientRepository,
  mockEventPublisher,
  mockPasswordHasher,
} from "../../testing/mocks/client-ports.mock";
import { CreateClientUseCase } from "./create-client.use-case";

describe("CreateClientUseCase", () => {
  let useCase: CreateClientUseCase;
  let repository: ReturnType<typeof mockClientRepository>;
  let hasher: ReturnType<typeof mockPasswordHasher>;
  let events: ReturnType<typeof mockEventPublisher>;

  beforeEach(() => {
    repository = mockClientRepository();
    hasher = mockPasswordHasher();
    events = mockEventPublisher();

    useCase = new CreateClientUseCase(repository, hasher, events);
  });

  it("creates a pending client, stores the hashed password and publishes client.created", async () => {
    const client = await useCase.execute(validCreateClientInput);

    expect(client.name.getValue()).toBe("Murilo Lodovico");
    expect(client.id.getValue()).toBe(CLIENT_PUBLIC_ID);
    expect(client.status.getValue()).toBe("pending");
    expect(hasher.hash).toHaveBeenCalledWith(validCreateClientInput.password);
    expect(repository.findByDocument).toHaveBeenCalledWith(
      validCreateClientInput.document,
    );
    expect(repository.findByEmail).toHaveBeenCalledWith(
      validCreateClientInput.email,
    );
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        publicId: CLIENT_PUBLIC_ID,
        name: "Murilo Lodovico",
        email: "murilo@example.com",
        document: validCreateClientInput.document,
        password: "scrypt$salt$10",
        status: "pending",
      }),
    );
    expect(events.publish).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "client.created",
        payload: { clientId: CLIENT_PUBLIC_ID, status: "pending" },
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

  it("rejects a weak password before hashing it", async () => {
    await expect(
      useCase.execute({ ...validCreateClientInput, password: "weak" }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(hasher.hash).not.toHaveBeenCalled();
    expect(repository.save).not.toHaveBeenCalled();
  });

  it("throws ConflictException when document is already in use", async () => {
    repository.findByDocument.mockResolvedValue(
      buildClient({
        id: "11111111-1111-4111-8111-111111111111",
        document: anotherValidDocument,
      }),
    );

    await expect(
      useCase.execute(validCreateClientInput),
    ).rejects.toBeInstanceOf(ConflictException);
    expect(repository.save).not.toHaveBeenCalled();
  });

  it("throws ConflictException when email is already in use", async () => {
    repository.findByEmail.mockResolvedValue(
      buildClient({
        id: "11111111-1111-4111-8111-111111111111",
        document: anotherValidDocument,
      }),
    );

    await expect(useCase.execute(validCreateClientInput)).rejects.toThrow(
      "Client email already in use",
    );
    expect(repository.save).not.toHaveBeenCalled();
  });

  it("throws InternalServerErrorException when repository fails", async () => {
    repository.save.mockRejectedValue(new Error("db down"));

    await expect(
      useCase.execute(validCreateClientInput),
    ).rejects.toBeInstanceOf(InternalServerErrorException);
    expect(events.publish).not.toHaveBeenCalled();
  });
});
