import { Result } from '../../../shared/utils/Result';
export declare class TransactionId {
    private readonly value;
    private constructor();
    static create(value: string): Result<TransactionId>;
    static generate(): TransactionId;
    static isValidTransactionId(value: string): boolean;
    static isUuidV4(value: string): boolean;
    equals(other: TransactionId): boolean;
    getValue(): string;
}
