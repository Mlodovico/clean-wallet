import { BadRequestException, NotFoundException } from "@nestjs/common";

import {
  CLIENT_PUBLIC_ID,
  buildClient,
} from "../../testing/fixtures/domain.fixtures";
import { mockClientRepository } from "../../testing/mocks/client-ports.mock";
import { GetClientUseCase } from "./get-client.use-case";

describe("GetClientUseCase", () => {
  let useCase: GetClientUseCase;
  let repository: ReturnType<typeof mockClientRepository>;

  beforeEach(() => {
    repository = mockClientRepository();
    useCase = new GetClientUseCase(repository);
  });

  it("returns the client found by public id", async () => {
    const client = buildClient();
    repository.findById.mockResolvedValue(client);

    const found = await useCase.execute(CLIENT_PUBLIC_ID);

    expect(repository.findById).toHaveBeenCalledWith(CLIENT_PUBLIC_ID);
    expect(found).toBe(client);
  });

  it("throws BadRequestException when the public id is invalid", async () => {
    await expect(useCase.execute("not-a-uuid")).rejects.toBeInstanceOf(
      BadRequestException,
    );

    expect(repository.findById).not.toHaveBeenCalled();
  });

  it("throws NotFoundException when the client does not exist", async () => {
    await expect(useCase.execute(CLIENT_PUBLIC_ID)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
