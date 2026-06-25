import { validCreateWalletInput } from "../../testing/fixtures/domain.fixtures";
import { Wallet } from "./Wallet";

describe("Wallet", () => {
  it("creates a valid wallet", () => {
    const result = Wallet.create(validCreateWalletInput);

    expect(result.isSuccess).toBe(true);
    expect(result.getValue().walletType.getValue()).toBe("personal");
    expect(result.getValue().clientId.getValue()).toBe(
      validCreateWalletInput.clientId,
    );
  });

  it("fails when wallet type is invalid", () => {
    const result = Wallet.create({
      ...validCreateWalletInput,
      walletType: "invalid",
    });

    expect(result.isFailure).toBe(true);
    expect(result.getError()).toContain("Invalid wallet type");
  });

  it("fails when client id is invalid", () => {
    const result = Wallet.create({
      ...validCreateWalletInput,
      clientId: "not-a-uuid",
    });

    expect(result.isFailure).toBe(true);
    expect(result.getError()).toContain("Invalid client ID");
  });

  it("fails when wallet limit is negative", () => {
    const result = Wallet.create({
      ...validCreateWalletInput,
      walletLimit: -1,
    });

    expect(result.isFailure).toBe(true);
    expect(result.getError()).toContain("Invalid wallet limit");
  });
});
