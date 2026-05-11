import { randomUUID } from 'crypto';
import { TransactionIdErrors } from '../errors/transactionId.errors';

import { Result } from '../../../shared/utils/Result';

export class TransactionId {
  private constructor(private readonly value: string) {}

  static create(value: string): Result<TransactionId> {
    if (typeof value !== 'string') {
      return Result.fail<TransactionId>(
        TransactionIdErrors.transactionIdMustBeString().message,
      );
    }

    const normalized = value.trim();

    if (normalized.length === 0) {
      return Result.fail<TransactionId>(
        TransactionIdErrors.transactionIdMustNotBeEmptyString().message,
      );
    }

    return Result.ok<TransactionId>(new TransactionId(normalized));
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
