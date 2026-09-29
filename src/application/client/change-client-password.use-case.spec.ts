import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";

import {
  CLIENT_PUBLIC_ID,
  buildClient,
  validPasswordHash,
} from "../../testing/fixtures/domain.fixtures";
import {
  mockClientRepository,
  mockEventPublisher,
  mockPasswordHasher,
} from "../../testing/mocks/client-ports.mock";
import { ChangeClientPasswordUseCase } from "./change-client-password.use-case";

const input = {
  id: CLIENT_PUBLIC_ID,
  currentPassword: "Password1!",
  newPassword: "NewPassword2@",
};

describe("ChangeClientPasswordUseCase", () => {
  let useCase: ChangeClientPasswordUseCase;
  let repository: ReturnType<typeof mockClientRepository>;
  let hasher: ReturnType<typeof mockPasswordHasher>;
  let events: ReturnType<typeof mockEventPublisher>;

  beforeEach(() => {
    repository = mockClientRepository();
    repository.findById.mockResolvedValue(buildClient());
    hasher = mockPasswordHasher();
    events = mockEventPublisher();

    useCase = new ChangeClientPasswordUseCase(repository, hasher, events);
  });

  it("verifies the current password, stores the new hash and publishes the event", async () => {
    await useCase.execute(input);

    expect(hasher.compare).toHaveBeenCalledWith(
      input.currentPassword,
      validPasswordHash,
    );
    expect(hasher.hash).toHaveBeenCalledWith(input.newPassword);
    expect(repository.update).toHaveBeenCalledWith(
      CLIENT_PUBLIC_ID,
      expect.objectContaining({ password: "scrypt$salt$13" }),
    );
    expect(events.publish).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "client.password_changed",
        payload: { clientId: CLIENT_PUBLIC_ID },
      }),
    );
  });

  it("throws UnauthorizedException when the current password is wrong", async () => {
    hasher.compare.mockResolvedValue(false);

    await expect(useCase.execute(input)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    expect(repository.update).not.toHaveBeenCalled();
  });

  it("rejects a new password equal to the current one", async () => {
    await expect(
      useCase.execute({ ...input, newPassword: input.currentPassword }),
    ).rejects.toThrow("New password must be different");
    expect(repository.update).not.toHaveBeenCalled();
  });

  it("rejects a weak new password", async () => {
    await expect(
      useCase.execute({ ...input, newPassword: "weak" }),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(hasher.hash).not.toHaveBeenCalled();
  });

  it("rejects an inactive client", async () => {
    repository.findById.mockResolvedValue(buildClient({ status: "inactive" }));

    await expect(useCase.execute(input)).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(repository.update).not.toHaveBeenCalled();
  });

  it("throws InternalServerErrorException when persisting fails", async () => {
    repository.update.mockRejectedValue(new Error("db down"));

    await expect(useCase.execute(input)).rejects.toBeInstanceOf(
      InternalServerErrorException,
    );
    expect(events.publish).not.toHaveBeenCalled();
  });
});
