import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

import {
  buildClient,
  validCreateWalletInput,
} from "../../testing/fixtures/domain.fixtures";
import { mockClientRepository } from "../../testing/mocks/client-ports.mock";
import { WalletRepositoryPort } from "../../domain/wallet/ports/wallet-repository.port";
import { CreateWalletUseCase } from "./create-wallet.use-case";

describe("CreateWalletUseCase", () => {
  let useCase: CreateWalletUseCase;
  let repository: jest.Mocked<WalletRepositoryPort>;
  let clientRepository: ReturnType<typeof mockClientRepository>;

  beforeEach(() => {
    repository = {
      save: jest.fn().mockResolvedValue({
        id: "wallet-id",
        ...validCreateWalletInput,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    };
    clientRepository = mockClientRepository();
    clientRepository.findById.mockResolvedValue(buildClient());

    useCase = new CreateWalletUseCase(repository, clientRepository);
  });

  it("creates and persists a wallet for an active client", async () => {
    const wallet = await useCase.execute(validCreateWalletInput);

    expect(wallet.walletType.getValue()).toBe("personal");
    expect(clientRepository.findById).toHaveBeenCalledWith(
      validCreateWalletInput.clientId,
    );
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        clientId: validCreateWalletInput.clientId,
        walletType: "personal",
        currency: 986,
        walletLimit: 5000,
      }),
    );
  });

  it("throws BadRequestException for invalid input", async () => {
    await expect(
      useCase.execute({
        ...validCreateWalletInput,
        walletType: "invalid",
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(repository.save).not.toHaveBeenCalled();
  });

  it("throws NotFoundException when the client does not exist", async () => {
    clientRepository.findById.mockResolvedValue(null);

    await expect(
      useCase.execute(validCreateWalletInput),
    ).rejects.toBeInstanceOf(NotFoundException);
    expect(repository.save).not.toHaveBeenCalled();
  });

  it.each(["pending", "suspended", "inactive"] as const)(
    "throws ConflictException when the client is %s",
    async (status) => {
      clientRepository.findById.mockResolvedValue(buildClient({ status }));

      await expect(
        useCase.execute(validCreateWalletInput),
      ).rejects.toBeInstanceOf(ConflictException);
      expect(repository.save).not.toHaveBeenCalled();
    },
  );

  it("throws InternalServerErrorException when repository fails", async () => {
    repository.save.mockRejectedValue(new Error("db down"));

    await expect(
      useCase.execute(validCreateWalletInput),
    ).rejects.toBeInstanceOf(InternalServerErrorException);
  });
});
