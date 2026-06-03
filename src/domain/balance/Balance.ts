import { Amount } from "./vo/Amount";
import { BalanceId } from "./vo/BalanceId";
import { Currency } from "./vo/Currency";
import { Description } from "./vo/Description";
import { OverdraftLimit } from "./vo/OverdraftLimit";
import { TransactionType } from "./vo/TrancactionType";
import { TransactionId } from "./vo/TransactionId";

const { randomUUID: uuidv4 } = require("crypto");

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
    props: Omit<Balance, "id" | "createdAt" | "updatedAt">,
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
