
export class TransactionTypeErrors extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'TransactionTypeErrors';
    }

    static transactionTypeMustBeString(): TransactionTypeErrors {
        return new TransactionTypeErrors('Transaction type must be a string');
    }

    static transactionTypeMustNotBeEmptyString(): TransactionTypeErrors {
        return new TransactionTypeErrors('Transaction type must not be an empty string');
    }
}