import { TransactionTypeErrors } from '../errors/transactionType.errors';
import { Result } from 'src/shared/utils/Result';
export declare class TransactionType {
    private readonly value;
    private constructor();
    static transactionTypeErrors: typeof TransactionTypeErrors;
    static create(value: string): Result<TransactionType>;
    static isValidTransactionType(value: string): boolean;
    static isEmpty(value: string): boolean;
    getValue(): string;
}
