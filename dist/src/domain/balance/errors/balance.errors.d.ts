export declare class BalanceIdErrors extends Error {
    constructor(message: string);
    static balanceIdMustBeString(): BalanceIdErrors;
    static balanceIdMustNotBeEmptyString(): BalanceIdErrors;
}
