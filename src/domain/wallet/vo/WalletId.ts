import { randomUUID } from "crypto";
import { Result } from "src/shared/utils/Result";
import { WalletIdErrors } from "../errors/walletid.errors";

export class WalletId {
  private constructor(private readonly value: string) {}

  static walletIdErrors = WalletIdErrors;

  static create(id: string): Result<WalletId> {
    if (!id || id.trim().length === 0) {
      return Result.fail<WalletId>(
        this.walletIdErrors.walletIdMustNotBeEmptyString().message,
      );
    }

    if (id.length !== 36) {
      return Result.fail<WalletId>(
        this.walletIdErrors.walletIdMustBeValidUUID().message,
      );
    }

    return Result.ok(new WalletId(id));
  }

  static generate(): Result<WalletId> {
    return WalletId.create(randomUUID());
  }

  getValue(): string {
    return this.value;
  }
}
