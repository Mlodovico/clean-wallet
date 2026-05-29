export declare class TransactionTypeErrors extends Error {
    constructor(message: string);
    static transactionTypeMustBeString(): TransactionTypeErrors;
    static transactionTypeMustNotBeEmptyString(): TransactionTypeErrors;
}
