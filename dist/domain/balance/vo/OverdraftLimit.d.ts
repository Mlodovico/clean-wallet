import { Result } from 'src/shared/utils/Result';
export declare class OverdraftLimit {
    private readonly cents;
    private constructor();
    static create(value: number): Result<OverdraftLimit>;
    private static hasAtMostTwoDecimals;
    isZero(): boolean;
    isPositive(): boolean;
    getValue(): number;
    getCents(): number;
}
