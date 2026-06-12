import { Result } from "../../../shared/utils/Result";
import { CurrencyErrors } from "../errors/currency.errors";
export declare class Currency {
    private readonly value;
    static currencyErrors: typeof CurrencyErrors;
    private constructor();
    static create(value: string): Result<Currency>;
    static is3CharactersLong(value: string): boolean;
    static isFinite(value: string): boolean;
    getValue(): string;
}
