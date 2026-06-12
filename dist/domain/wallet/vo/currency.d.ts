import { Result } from "../../../shared/utils/Result";
import { CurrencyErrors } from "../errors/currency.errors";
export declare class Currency {
    private readonly value;
    private constructor();
    static currencyErrors: typeof CurrencyErrors;
    static create(value: number): Result<Currency>;
    getValue(): number;
}
