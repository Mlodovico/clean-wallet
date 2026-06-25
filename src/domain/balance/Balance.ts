import { Result } from "../../shared/utils/Result";
import { Amount } from "./vo/Amount";
import { BalanceId } from "./vo/BalanceId";
import { Currency } from "./vo/Currency";
import { Description } from "./vo/Description";
import { OverdraftLimit } from "./vo/OverdraftLimit";
import { TransactionType } from "./vo/TrancactionType";
import { TransactionId } from "./vo/TransactionId";

export type RawBalanceProps = {
  amount: number;
  overdraftLimit: number;
  currency: string;
  transactionType: string;
  transactionId: string;
  description: string;
};

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

  static create(props: RawBalanceProps): Result<Balance> {
    const amountResult = Amount.create(props.amount);
    if (amountResult.isFailure) {
      return Result.fail<Balance>(`Invalid amount: ${amountResult.getError()}`);
    }

    const overdraftLimitResult = OverdraftLimit.create(props.overdraftLimit);
    if (overdraftLimitResult.isFailure) {
      return Result.fail<Balance>(
        `Invalid overdraft limit: ${overdraftLimitResult.getError()}`,
      );
    }

    const currencyResult = Currency.create(props.currency);
    if (currencyResult.isFailure) {
      return Result.fail<Balance>(
        `Invalid currency: ${currencyResult.getError()}`,
      );
    }

    const transactionTypeResult = TransactionType.create(props.transactionType);
    if (transactionTypeResult.isFailure) {
      return Result.fail<Balance>(
        `Invalid transaction type: ${transactionTypeResult.getError()}`,
      );
    }

    const transactionIdResult = TransactionId.create(props.transactionId);
    if (transactionIdResult.isFailure) {
      return Result.fail<Balance>(
        `Invalid transaction id: ${transactionIdResult.getError()}`,
      );
    }

    const descriptionResult = Description.create(props.description);
    if (descriptionResult.isFailure) {
      return Result.fail<Balance>(
        `Invalid description: ${descriptionResult.getError()}`,
      );
    }

    return Result.ok(
      new Balance(
        BalanceId.generate(),
        amountResult.getValue(),
        overdraftLimitResult.getValue(),
        currencyResult.getValue(),
        transactionTypeResult.getValue(),
        transactionIdResult.getValue(),
        descriptionResult.getValue(),
        new Date(),
        new Date(),
      ),
    );
  }
}
