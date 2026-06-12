export declare class AmountErrors extends Error {
    constructor(message: string);
    static amountMustBeGreaterThanZero(): AmountErrors;
    static amountMustBeFinite(): AmountErrors;
    static amountMustHaveAtMostTwoDecimals(): AmountErrors;
}
