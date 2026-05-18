import { Result } from 'src/shared/utils/Result';

export class WalletId {
  private constructor(private readonly value: string) {}

  static create(id: string): Result<WalletId> {
    if (!id || id.trim().length === 0) {
      return Result.fail<WalletId>('Wallet ID cannot be empty');
    }

    if (id.length !== 36) {
      // Exemplo: validação de UUID
      return Result.fail<WalletId>('Wallet ID must be a valid UUID');
    }

    return Result.ok(new WalletId(id));
  }

  getValue(): string {
    return this.value;
  }
}
