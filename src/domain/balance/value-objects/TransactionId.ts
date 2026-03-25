import { randomUUID } from 'crypto';
import { TransactionIdErrors } from '../errors/transactionId.errors';

export class TransactionId {
  private constructor(private readonly value: string) {}

  static create(value: string): TransactionId {
    if (typeof value !== 'string') {
      throw TransactionIdErrors.transactionIdMustBeString();
    }

    const normalized = value.trim();

    if (normalized.length === 0) {
      throw TransactionIdErrors.transactionIdMustNotBeEmptyString();
    }

    // opcional: endurecer para UUID v4
    // if (!TransactionId.isUuidV4(normalized)) {
    //   throw TransactionIdErrors.transactionIdMustBeUuidV4();
    // }

    return new TransactionId(normalized);
  }

  static generate(): TransactionId {
    return new TransactionId(randomUUID());
  }

  static isValidTransactionId(value: string): boolean {
    return typeof value === 'string' && value.trim().length > 0;
  }

  static isUuidV4(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value,
    );
  }

  equals(other: TransactionId): boolean {
    return this.value === other.value;
  }

  getValue(): string {
    return this.value;
  }
}
