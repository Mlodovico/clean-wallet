import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

import {
  CLIENT_PUBLIC_ID,
  buildClient,
} from "../../testing/fixtures/domain.fixtures";
import {
  mockClientRepository,
  mockEventPublisher,
  mockUnitOfWork,
} from "../../testing/mocks/client-ports.mock";
import { ChangeClientStatusUseCase } from "./change-client-status.use-case";

describe("ChangeClientStatusUseCase", () => {
  let useCase: ChangeClientStatusUseCase;
  let repository: ReturnType<typeof mockClientRepository>;
  let events: ReturnType<typeof mockEventPublisher>;
  let unitOfWork: ReturnType<typeof mockUnitOfWork>;

  beforeEach(() => {
    repository = mockClientRepository();
    events = mockEventPublisher();
    unitOfWork = mockUnitOfWork();
    useCase = new ChangeClientStatusUseCase(repository, events, unitOfWork);
  });

  it.each([
    ["pending", "activate", "active", "client.activated"],
    ["active", "suspend", "suspended", "client.suspended"],
    ["suspended", "deactivate", "inactive", "client.deactivated"],
  ] as const)(
    "moves a %s client with %s, persists it and publishes the event",
    async (from, action, to, eventType) => {
      repository.findById.mockResolvedValue(buildClient({ status: from }));

      const updated = await useCase.execute({ id: CLIENT_PUBLIC_ID, action });

      expect(updated.status.getValue()).toBe(to);
      expect(repository.update).toHaveBeenCalledWith(
        CLIENT_PUBLIC_ID,
        expect.objectContaining({ status: to }),
      );
      expect(events.publish).toHaveBeenCalledWith(
        expect.objectContaining({
          type: eventType,
          payload: { clientId: CLIENT_PUBLIC_ID, from, to },
        }),
      );
    },
  );

  it("throws ConflictException for a transition that is not allowed", async () => {
    repository.findById.mockResolvedValue(buildClient({ status: "inactive" }));

    await expect(
      useCase.execute({ id: CLIENT_PUBLIC_ID, action: "activate" }),
    ).rejects.toBeInstanceOf(ConflictException);

    expect(repository.update).not.toHaveBeenCalled();
    expect(events.publish).not.toHaveBeenCalled();
  });

  it("throws NotFoundException when the client does not exist", async () => {
    await expect(
      useCase.execute({ id: CLIENT_PUBLIC_ID, action: "activate" }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it("does not publish when persisting fails", async () => {
    repository.findById.mockResolvedValue(buildClient({ status: "pending" }));
    repository.update.mockRejectedValue(new Error("db down"));

    await expect(
      useCase.execute({ id: CLIENT_PUBLIC_ID, action: "activate" }),
    ).rejects.toBeInstanceOf(InternalServerErrorException);
    expect(events.publish).not.toHaveBeenCalled();
  });
});
