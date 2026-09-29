export declare class StatusErrors extends Error {
    static invalidTransition(from: string, to: string): StatusErrors;
    static clientIsInactive(): StatusErrors;
    static clientIsNotActive(): StatusErrors;
}
