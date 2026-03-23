import { Amount } from "./value-objects/Amount";
import { OverdraftLimit } from "./value-objects/OverdraftLimit";

const { randomUUID: uuidv4 } = require('crypto');

export class Balance {
  constructor(
    public readonly id: string,
    public readonly amount: Amount,
    public readonly overdraftLimit: OverdraftLimit,
    public readonly currency: string,
    public readonly transactionType: string,
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