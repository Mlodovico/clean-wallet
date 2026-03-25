import { Amount } from "./value-objects/Amount";
import { Currency } from './value-objects/Currency';
import { OverdraftLimit } from "./value-objects/OverdraftLimit";
import { TransactionType } from './value-objects/TrancactionType';

const { randomUUID: uuidv4 } = require('crypto');

export class Balance {
  constructor(
    public readonly id: string,
    public readonly amount: Amount,
    public readonly overdraftLimit: OverdraftLimit,
    public readonly currency: Currency,
    public readonly transactionType: TransactionType,
    public readonly transactionId: string,
    public readonly description: string,
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