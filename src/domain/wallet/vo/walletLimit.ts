import { Result } from 'src/shared/utils/Result';

export class WalletLimit {
  private constructor(private readonly value: number) {}

  static create(limit: number): Result<WalletLimit> {
    if (limit < 0) {
      return Result.fail<WalletLimit>('Wallet limit cannot be negative');
    }

    return Result.ok(new WalletLimit(limit));
  }

  getValue(): number {
    return this.value;
  }
}
