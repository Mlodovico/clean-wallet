import { Result } from "src/shared/utils/Result";
import { WalletTypesErrors } from "../errors/walletTypes.errors";

export class WalletType {
  private constructor(private readonly value: string) {}

  static walletTypeErrors = WalletTypesErrors;

  static create(type: string): Result<WalletType> {
    const validTypes = ["personal", "business"]; // Exemplo de tipos válidos
    if (!validTypes.includes(type)) {
      return Result.fail<WalletType>(
        this.walletTypeErrors.walletTypesMustBeArray().message,
      );
    }

    return Result.ok(new WalletType(type));
  }

  getValue(): string {
    return this.value;
  }
}
