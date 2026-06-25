import {
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";

import { validCreateWalletInput } from "../../testing/fixtures/domain.fixtures";
import { WalletRepositoryPort } from "../../domain/wallet/ports/wallet-repository.port";
import { CreateWalletUseCase } from "./create-wallet.use-case";

describe("CreateWalletUseCase", () => {
  let useCase: CreateWalletUseCase;
  let repository: jest.Mocked<WalletRepositoryPort>;

  beforeEach(() => {
    repository = {
      save: jest.fn().mockResolvedValue({
        id: "wallet-id",
        ...validCreateWalletInput,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    };

    useCase = new CreateWalletUseCase(repository);
  });

  it("creates and persists a wallet", async () => {
    const wallet = await useCase.execute(validCreateWalletInput);

    expect(wallet.walletType.getValue()).toBe("personal");
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

  it("throws InternalServerErrorException when repository fails", async () => {
    repository.save.mockRejectedValue(new Error("db down"));

    await expect(
      useCase.execute(validCreateWalletInput),
    ).rejects.toBeInstanceOf(InternalServerErrorException);
  });
});
