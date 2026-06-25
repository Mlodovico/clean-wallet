export declare class UniqueEntityId {
    private readonly id;
    constructor(id: string);
    static generate(): string;
    static isValid(id: string): boolean;
}
