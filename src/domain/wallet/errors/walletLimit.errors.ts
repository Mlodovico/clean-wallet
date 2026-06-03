
export class WalletLimitErrors extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WalletLimitErrors';
  }

  static walletLimitCannotBeNegative(): WalletLimitErrors {
    return new WalletLimitErrors('Wallet limit cannot be negative');
  }
}