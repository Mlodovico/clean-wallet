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
export declare class Balance {
    readonly id: BalanceId;
    readonly amount: Amount;
    readonly overdraftLimit: OverdraftLimit;
    readonly currency: Currency;
    readonly transactionType: TransactionType;
    readonly transactionId: TransactionId;
    readonly description: Description;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(id: BalanceId, amount: Amount, overdraftLimit: OverdraftLimit, currency: Currency, transactionType: TransactionType, transactionId: TransactionId, description: Description, createdAt: Date, updatedAt: Date);
    static create(props: RawBalanceProps): Result<Balance>;
}
