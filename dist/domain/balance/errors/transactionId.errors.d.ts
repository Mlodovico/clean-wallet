export declare class TransactionIdErrors extends Error {
    constructor(message: string);
    static transactionIdMustBeString(): TransactionIdErrors;
    static transactionIdMustNotBeEmptyString(): TransactionIdErrors;
    static transactionIdMustBeUuidV4(): TransactionIdErrors;
}
