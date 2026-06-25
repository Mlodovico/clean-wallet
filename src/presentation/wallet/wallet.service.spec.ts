import { validCreateWalletInput } from "../../testing/fixtures/domain.fixtures";
import { Wallet } from "../../domain/wallet/Wallet";
import { CreateWalletUseCase } from "../../application/wallet/create-wallet.use-case";
import { WalletService } from "./wallet.service";

describe("WalletService", () => {
  let service: WalletService;
  let createWalletUseCase: jest.Mocked<CreateWalletUseCase>;

  beforeEach(() => {
    createWalletUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<CreateWalletUseCase>;

    service = new WalletService(createWalletUseCase);
  });

  it("returns an empty list by default", () => {
    expect(service.findAll()).toEqual([]);
  });

  it("creates a wallet through the use case and stores it in memory", async () => {
    const wallet = Wallet.create(validCreateWalletInput).getValue();
    createWalletUseCase.execute.mockResolvedValue(wallet);

    const created = await service.create(validCreateWalletInput);

    expect(createWalletUseCase.execute).toHaveBeenCalledWith(
      validCreateWalletInput,
    );
    expect(created).toBe(wallet);
    expect(service.findAll()).toHaveLength(1);
  });
});
