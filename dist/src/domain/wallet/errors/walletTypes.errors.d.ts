export declare class WalletTypesErrors extends Error {
    constructor(message: string);
    static walletTypesMustBeArray(): WalletTypesErrors;
    static walletTypesCannotBeEmpty(): WalletTypesErrors;
    static walletTypesMustContainValidType(): WalletTypesErrors;
}
