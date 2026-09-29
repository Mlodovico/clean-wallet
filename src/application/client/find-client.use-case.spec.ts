import { BadRequestException, NotFoundException } from "@nestjs/common";

import {
  buildClient,
  validCreateClientInput,
} from "../../testing/fixtures/domain.fixtures";
import { mockClientRepository } from "../../testing/mocks/client-ports.mock";
import { FindClientUseCase } from "./find-client.use-case";

describe("FindClientUseCase", () => {
  let useCase: FindClientUseCase;
  let repository: ReturnType<typeof mockClientRepository>;

  beforeEach(() => {
    repository = mockClientRepository();
    useCase = new FindClientUseCase(repository);
  });

  it("finds a client by a formatted document", async () => {
    const client = buildClient();
    repository.findByDocument.mockResolvedValue(client);

    await expect(useCase.execute({ document: "529.982.247-25" })).resolves.toBe(
      client,
    );
    expect(repository.findByDocument).toHaveBeenCalledWith(
      validCreateClientInput.document,
    );
  });

  it("finds a client by email, normalized to lowercase", async () => {
    const client = buildClient();
    repository.findByEmail.mockResolvedValue(client);

    await expect(
      useCase.execute({ email: "Murilo@Example.com" }),
    ).resolves.toBe(client);
    expect(repository.findByEmail).toHaveBeenCalledWith("murilo@example.com");
  });

  it.each([
    [{}],
    [{ document: validCreateClientInput.document, email: "a@b.com" }],
  ])("requires exactly one criterion (%o)", async (criteria) => {
    await expect(useCase.execute(criteria)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it("rejects an invalid document", async () => {
    await expect(useCase.execute({ document: "123" })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(repository.findByDocument).not.toHaveBeenCalled();
  });

  it("rejects an invalid email", async () => {
    await expect(
      useCase.execute({ email: "not-an-email" }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it("throws NotFoundException when no client matches", async () => {
    await expect(
      useCase.execute({ email: "nobody@example.com" }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
