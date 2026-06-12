export declare class WalletLimitErrors extends Error {
    constructor(message: string);
    static walletLimitCannotBeNegative(): WalletLimitErrors;
}
