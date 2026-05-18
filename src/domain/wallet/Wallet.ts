import { Result } from 'src/shared/utils/Result';
import { WalletId } from './vo/WalletId';
import { WalletType } from './vo/walletTypes';
import { Currency } from './vo/currency';
import { WalletLimit } from './vo/walletLimit';

type RawWalletProps = {
  id: string;
  clientId: string;
  walletType: string;
  currency: number;
  walletLimit: number;
};

export class Wallet {
  constructor(
    public readonly id: WalletId,
    public readonly clientId: string,
    public readonly walletType: WalletType,
    public readonly currency: Currency,
    public readonly walletLimit: WalletLimit,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(props: RawWalletProps): Result<Wallet> {
    // Validação do WalletId
    const walletIdResult = WalletId.create(props.id);
    if (walletIdResult.isFailure) {
      return Result.fail<Wallet>(
        `Invalid wallet ID: ${walletIdResult.getError()}`,
      );
    }

    // Validação do WalletType
    const walletTypeResult = WalletType.create(props.walletType);
    if (walletTypeResult.isFailure) {
      return Result.fail<Wallet>(
        `Invalid wallet type: ${walletTypeResult.getError()}`,
      );
    }

    // Validação do Currency
    const currencyResult = Currency.create(props.currency);
    if (currencyResult.isFailure) {
      return Result.fail<Wallet>(
        `Invalid currency: ${currencyResult.getError()}`,
      );
    }

    // Validação do WalletLimit
    const walletLimitResult = WalletLimit.create(props.walletLimit);
    if (walletLimitResult.isFailure) {
      return Result.fail<Wallet>(
        `Invalid wallet limit: ${walletLimitResult.getError()}`,
      );
    }

    // Se todas as validações passarem, criar a Wallet
    return Result.ok(
      new Wallet(
        walletIdResult.getValue(),
        props.clientId,
        walletTypeResult.getValue(),
        currencyResult.getValue(),
        walletLimitResult.getValue(),
        new Date(),
        new Date(),
      ),
    );
  }
}
