import { Result } from 'src/shared/utils/Result';

export class WalletType {
  private constructor(private readonly value: string) {}

  static create(type: string): Result<WalletType> {
    const validTypes = ['personal', 'business']; // Exemplo de tipos válidos
    if (!validTypes.includes(type)) {
      return Result.fail<WalletType>('Invalid wallet type');
    }

    return Result.ok(new WalletType(type));
  }

  getValue(): string {
    return this.value;
  }
}
