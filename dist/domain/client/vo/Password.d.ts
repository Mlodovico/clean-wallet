import { Result } from "../../../shared/utils/Result";
export declare class Password {
    private readonly value;
    private static readonly MIN_LENGTH;
    private static readonly MAX_LENGTH;
    private static readonly COMMON_PASSWORDS;
    private constructor();
    static create(password: string): Result<Password>;
    private static validate;
    private static meetsComplexity;
    get asString(): string;
    getValue(): string;
}
