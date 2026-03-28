import { Amount } from "./value-objects/Amount";
import { BalanceId } from './value-objects/BalanceId';
import { Currency } from './value-objects/Currency';
import { Description } from './value-objects/Description';
import { OverdraftLimit } from "./value-objects/OverdraftLimit";
import { TransactionType } from './value-objects/TrancactionType';
import { TransactionId } from './value-objects/TransactionId';

const { randomUUID: uuidv4 } = require('crypto');

export class Balance {
  constructor(
    public readonly id: BalanceId,
    public readonly amount: Amount,
    public readonly overdraftLimit: OverdraftLimit,
    public readonly currency: Currency,
    public readonly transactionType: TransactionType,
    public readonly transactionId: TransactionId,
    public readonly description: Description,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(
    props: Omit<Balance, 'id' | 'createdAt' | 'updatedAt'>,
  ): Balance {
    return new Balance(
      uuidv4(),
      props.amount,
      props.overdraftLimit,
      props.currency,
      props.transactionType,
      props.transactionId,
      props.description,
      new Date(),
      new Date(),
    );
  }
}