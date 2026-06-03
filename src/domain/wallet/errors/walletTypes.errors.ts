
export class WalletTypesErrors extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WalletTypesErrors';
  }

  static walletTypesMustBeArray(): WalletTypesErrors {
    return new WalletTypesErrors('Wallet types must be an array');
  }

  static walletTypesCannotBeEmpty(): WalletTypesErrors {
    return new WalletTypesErrors('Wallet types cannot be empty');
  }

  static walletTypesMustContainValidType(): WalletTypesErrors {
    return new WalletTypesErrors('Wallet types must contain valid types');
  }
}