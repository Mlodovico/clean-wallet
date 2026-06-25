import { validCreateBalanceInput } from "../../testing/fixtures/domain.fixtures";
import { Balance } from "../../domain/balance/Balance";
import { CreateBalanceUseCase } from "../../application/balance/create-balance.use-case";
import { BalanceService } from "./balance.service";

describe("BalanceService", () => {
  let service: BalanceService;
  let createBalanceUseCase: jest.Mocked<CreateBalanceUseCase>;

  beforeEach(() => {
    createBalanceUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<CreateBalanceUseCase>;

    service = new BalanceService(createBalanceUseCase);
  });

  it("returns an empty list by default", () => {
    expect(service.findAll()).toEqual([]);
  });

  it("creates a balance through the use case and stores it in memory", async () => {
    const balance = Balance.create(validCreateBalanceInput).getValue();
    createBalanceUseCase.execute.mockResolvedValue(balance);

    const created = await service.create(validCreateBalanceInput);

    expect(createBalanceUseCase.execute).toHaveBeenCalledWith(
      validCreateBalanceInput,
    );
    expect(created).toBe(balance);
    expect(service.findAll()).toHaveLength(1);
  });
});
