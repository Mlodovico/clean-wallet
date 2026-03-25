
export class TransactionIdErrors extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'TransactionIdErrors';
    }

    static transactionIdMustBeString(): TransactionIdErrors {
        return new TransactionIdErrors('Transaction ID must be a string');
    }

    static transactionIdMustNotBeEmptyString(): TransactionIdErrors {
        return new TransactionIdErrors('Transaction ID must not be an empty string');
    }

    static transactionIdMustBeUuidV4(): TransactionIdErrors {
        return new TransactionIdErrors('Transaction ID must be a valid UUID v4');
    }
}