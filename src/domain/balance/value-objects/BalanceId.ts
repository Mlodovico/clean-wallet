import { randomUUID } from "crypto";
import { BalanceIdErrors } from "../errors/balance.errors";

export class BalanceId {
  private constructor(readonly value) {}

  static create(value: string) {
    if (typeof value !== 'string') {
      throw BalanceIdErrors.balanceIdMustBeString();
    }

    const normalized = value.trim();

    if (normalized.length === 0) {
      throw BalanceIdErrors.balanceIdMustNotBeEmptyString();
    }

    return new BalanceId(normalized);
  }
  static isValidBalanceId(value: string): boolean {
    return typeof value === 'string' && value.trim().length > 0;
  }

  static isUuidV4(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value,
    );
  }

  static generate(): BalanceId {
    return new BalanceId(randomUUID());
  }

  equals(other: BalanceId): boolean {
    return this.value === other.value;
  }

  getValue(): string {
    return this.value;
  }
}