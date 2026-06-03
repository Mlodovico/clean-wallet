import { TransactionTypeErrors } from "../errors/transactionType.errors";

import { Result } from "src/shared/utils/Result";

export class TransactionType {
  private constructor(private readonly value: string) {}
  static transactionTypeErrors = TransactionTypeErrors;

  static create(value: string): Result<TransactionType> {
    if (!TransactionType.isValidTransactionType(value)) {
      return Result.fail<TransactionType>(
        this.transactionTypeErrors.transactionTypeMustBeString().message,
      );
    }

    if (TransactionType.isEmpty(value)) {
      return Result.fail<TransactionType>(
        this.transactionTypeErrors.transactionTypeMustNotBeEmptyString()
          .message,
      );
    }

    return Result.ok<TransactionType>(new TransactionType(value));
  }

  static isValidTransactionType(value: string): boolean {
    return typeof value === "string" && value.length > 0;
  }

  static isEmpty(value: string): boolean {
    return value.length === 0;
  }

  getValue(): string {
    return this.value;
  }
}
