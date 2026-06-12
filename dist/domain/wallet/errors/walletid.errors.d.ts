export declare class WalletIdErrors extends Error {
    constructor(message: string);
    static walletIdMustBeString(): WalletIdErrors;
    static walletIdMustNotBeEmptyString(): WalletIdErrors;
    static walletIdMustBeValidUUID(): WalletIdErrors;
}
