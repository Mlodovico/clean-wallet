import { Result } from "../../../shared/utils/Result";
import { AmountErrors } from "../errors/amount.errors";
export declare class Amount {
    private readonly value;
    static amountErrors: typeof AmountErrors;
    private constructor();
    static create(amount: number): Result<Amount>;
    static isPositive(value: number): boolean;
    static isNegative(value: number): boolean;
    static hasAtMostTwoDecimals(value: number): boolean;
    static isFinite(value: number): boolean;
    getValue(): number;
}
