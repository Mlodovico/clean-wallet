import { Result } from "../../shared/utils/Result";
import { ClientId } from "../client/vo/ClientId";
import { WalletId } from "./vo/WalletId";
import { WalletType } from "./vo/walletTypes";
import { Currency } from "./vo/currency";
import { WalletLimit } from "./vo/walletLimit";

export type RawWalletProps = {
  clientId: string;
  walletType: string;
  currency: number;
  walletLimit: number;
};

export class Wallet {
  constructor(
    public readonly id: WalletId,
    public readonly clientId: ClientId,
    public readonly walletType: WalletType,
    public readonly currency: Currency,
    public readonly walletLimit: WalletLimit,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(props: RawWalletProps): Result<Wallet> {
    const walletIdResult = WalletId.generate();
    if (walletIdResult.isFailure) {
      return Result.fail<Wallet>(
        `Invalid wallet ID: ${walletIdResult.getError()}`,
      );
    }

    const walletTypeResult = WalletType.create(props.walletType);
    if (walletTypeResult.isFailure) {
      return Result.fail<Wallet>(
        `Invalid wallet type: ${walletTypeResult.getError()}`,
      );
    }

    const currencyResult = Currency.create(props.currency);
    if (currencyResult.isFailure) {
      return Result.fail<Wallet>(
        `Invalid currency: ${currencyResult.getError()}`,
      );
    }

    const walletLimitResult = WalletLimit.create(props.walletLimit);
    if (walletLimitResult.isFailure) {
      return Result.fail<Wallet>(
        `Invalid wallet limit: ${walletLimitResult.getError()}`,
      );
    }

    const clientIdResult = ClientId.create(props.clientId);
    if (clientIdResult.isFailure) {
      return Result.fail<Wallet>(
        `Invalid client ID: ${clientIdResult.getError()}`,
      );
    }

    return Result.ok(
      new Wallet(
        walletIdResult.getValue(),
        clientIdResult.getValue(),
        walletTypeResult.getValue(),
        currencyResult.getValue(),
        walletLimitResult.getValue(),
        new Date(),
        new Date(),
      ),
    );
  }
}
