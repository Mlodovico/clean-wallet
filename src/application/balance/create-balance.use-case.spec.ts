import {
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";

import { validCreateBalanceInput } from "../../testing/fixtures/domain.fixtures";
import { BalanceRepositoryPort } from "../../domain/balance/ports/balance-repository.port";
import { CreateBalanceUseCase } from "./create-balance.use-case";

describe("CreateBalanceUseCase", () => {
  let useCase: CreateBalanceUseCase;
  let repository: jest.Mocked<BalanceRepositoryPort>;

  beforeEach(() => {
    repository = {
      save: jest.fn().mockResolvedValue({
        id: "balance-id",
        ...validCreateBalanceInput,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    };

    useCase = new CreateBalanceUseCase(repository);
  });

  it("creates and persists a balance", async () => {
    const balance = await useCase.execute(validCreateBalanceInput);

    expect(balance.amount.getValue()).toBe(150.75);
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 150.75,
        currency: "BRL",
        description: "Initial balance",
      }),
    );
  });

  it("throws BadRequestException for invalid input", async () => {
    await expect(
      useCase.execute({
        ...validCreateBalanceInput,
        amount: 0,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(repository.save).not.toHaveBeenCalled();
  });

  it("throws InternalServerErrorException when repository fails", async () => {
    repository.save.mockRejectedValue(new Error("db down"));

    await expect(
      useCase.execute(validCreateBalanceInput),
    ).rejects.toBeInstanceOf(InternalServerErrorException);
  });
});
