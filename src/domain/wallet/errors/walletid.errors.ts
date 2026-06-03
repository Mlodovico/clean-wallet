export class WalletIdErrors extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WalletIdErrors";
  }

  static walletIdMustBeString(): WalletIdErrors {
    return new WalletIdErrors("Wallet ID must be a string");
  }

  static walletIdMustNotBeEmptyString(): WalletIdErrors {
    return new WalletIdErrors("Wallet ID must not be an empty string");
  }

  static walletIdMustBeValidUUID(): WalletIdErrors {
    return new WalletIdErrors("Wallet ID must be a valid UUID");
  }
}
