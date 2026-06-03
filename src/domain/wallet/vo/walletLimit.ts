import { Result } from "src/shared/utils/Result";
import { WalletLimitErrors } from "../errors/walletLimit.errors";

export class WalletLimit {
  private constructor(private readonly value: number) {}

  static walletLimitErrors = WalletLimitErrors;

  static create(limit: number): Result<WalletLimit> {
    if (limit < 0) {
      return Result.fail<WalletLimit>(
        this.walletLimitErrors.walletLimitCannotBeNegative().message,
      );
    }

    return Result.ok(new WalletLimit(limit));
  }

  getValue(): number {
    return this.value;
  }
}
