import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

import {
  CLIENT_PUBLIC_ID,
  anotherValidDocument,
  buildClient,
  validCreateClientInput,
} from "../../testing/fixtures/domain.fixtures";
import { mockClientRepository } from "../../testing/mocks/client-ports.mock";
import { UpdateClientUseCase } from "./update-client.use-case";

const OTHER_ID = "11111111-1111-4111-8111-111111111111";

describe("UpdateClientUseCase", () => {
  let useCase: UpdateClientUseCase;
  let repository: ReturnType<typeof mockClientRepository>;

  beforeEach(() => {
    repository = mockClientRepository();
    repository.findById.mockResolvedValue(buildClient());

    useCase = new UpdateClientUseCase(repository);
  });

  it("loads the client by public id and updates the provided fields", async () => {
    const updated = await useCase.execute({
      id: CLIENT_PUBLIC_ID,
      name: "Jane Doe",
    });

    expect(repository.findById).toHaveBeenCalledWith(CLIENT_PUBLIC_ID);
    expect(repository.findByDocument).not.toHaveBeenCalled();
    expect(repository.findByEmail).not.toHaveBeenCalled();
    expect(updated.name.getValue()).toBe("Jane Doe");
    expect(updated.document.getValue()).toBe(validCreateClientInput.document);
    expect(repository.update).toHaveBeenCalledWith(
      CLIENT_PUBLIC_ID,
      expect.objectContaining({
        publicId: CLIENT_PUBLIC_ID,
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
      useCase.execute({ id: CLIENT_PUBLIC_ID, name: "Jane Doe" }),
    ).rejects.toBeInstanceOf(NotFoundException);

    expect(repository.update).not.toHaveBeenCalled();
  });

  it("changes the document when no other client uses it", async () => {
    const updated = await useCase.execute({
      id: CLIENT_PUBLIC_ID,
      document: anotherValidDocument,
    });

    expect(repository.findByDocument).toHaveBeenCalledWith(
      anotherValidDocument,
    );
    expect(updated.document.getValue()).toBe(anotherValidDocument);
  });

  it("does not look up document uniqueness when the document is unchanged", async () => {
    await useCase.execute({
      id: CLIENT_PUBLIC_ID,
      document: validCreateClientInput.document,
    });

    expect(repository.findByDocument).not.toHaveBeenCalled();
  });

  it("rejects a document change when another client already uses it", async () => {
    repository.findByDocument.mockResolvedValue(
      buildClient({ id: OTHER_ID, document: anotherValidDocument }),
    );

    await expect(
      useCase.execute({ id: CLIENT_PUBLIC_ID, document: anotherValidDocument }),
    ).rejects.toBeInstanceOf(ConflictException);

    expect(repository.update).not.toHaveBeenCalled();
  });

  it("rejects an email change when another client already uses it", async () => {
    repository.findByEmail.mockResolvedValue(
      buildClient({ id: OTHER_ID, email: "jane@example.com" }),
    );

    await expect(
      useCase.execute({ id: CLIENT_PUBLIC_ID, email: "Jane@Example.com" }),
    ).rejects.toThrow("Client email already in use");

    expect(repository.findByEmail).toHaveBeenCalledWith("jane@example.com");
    expect(repository.update).not.toHaveBeenCalled();
  });

  it("does not change status or password through a profile update", async () => {
    repository.findById.mockResolvedValue(buildClient({ status: "pending" }));

    const updated = await useCase.execute({
      id: CLIENT_PUBLIC_ID,
      name: "Jane Doe",
      status: "active",
      password: "Another1!",
    } as never);

    expect(updated.status.getValue()).toBe("pending");
    expect(repository.update).toHaveBeenCalledWith(
      CLIENT_PUBLIC_ID,
      expect.objectContaining({ status: "pending" }),
    );
  });

  it("rejects updates on an inactive client", async () => {
    repository.findById.mockResolvedValue(buildClient({ status: "inactive" }));

    await expect(
      useCase.execute({ id: CLIENT_PUBLIC_ID, name: "Jane Doe" }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(repository.update).not.toHaveBeenCalled();
  });

  it("throws BadRequestException when updated fields are invalid", async () => {
    await expect(
      useCase.execute({ id: CLIENT_PUBLIC_ID, email: "invalid-email" }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(repository.update).not.toHaveBeenCalled();
  });

  it("throws InternalServerErrorException when repository update fails", async () => {
    repository.update.mockRejectedValue(new Error("db down"));

    await expect(
      useCase.execute({ id: CLIENT_PUBLIC_ID, name: "Jane Doe" }),
    ).rejects.toBeInstanceOf(InternalServerErrorException);
  });
});
