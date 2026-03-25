import { TransactionTypeErrors } from "../errors/transactionType.errors";

export class TransactionType {
    private constructor(private readonly value: string) {}
    static transactionTypeErrors = TransactionTypeErrors;

    static create(value: string): TransactionType {
        if (!TransactionType.isValidTransactionType(value)) {
          throw this.transactionTypeErrors.transactionTypeMustBeString();
        }

        if (TransactionType.isEmpty(value)) {
            throw this.transactionTypeErrors.transactionTypeMustNotBeEmptyString();
        }

        return new TransactionType(value);
    }

    static isValidTransactionType(value: string): boolean {
        return typeof value === 'string' && value.length > 0;
    }

    static isEmpty(value: string): boolean {
        return value.length === 0;
    }

    getValue(): string {
        return this.value;
    }
}