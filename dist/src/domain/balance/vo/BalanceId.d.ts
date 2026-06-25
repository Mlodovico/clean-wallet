export declare class BalanceId {
    private readonly value;
    private constructor();
    static create(value: string): BalanceId;
    static isValidBalanceId(value: string): boolean;
    static isUuidV4(value: string): boolean;
    static generate(): BalanceId;
    equals(other: BalanceId): boolean;
    getValue(): string;
}
