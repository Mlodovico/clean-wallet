export declare class OverdraftLimitErrors extends Error {
    constructor(message: string);
    static overdraftLimitMustBeFinite(): OverdraftLimitErrors;
    static overdraftLimitMustBeValidNumbers(): OverdraftLimitErrors;
    static overdraftLimitCannotBeNegative(): OverdraftLimitErrors;
    static overdraftLimitMustHaveAtMostTwoDecimals(): OverdraftLimitErrors;
}
