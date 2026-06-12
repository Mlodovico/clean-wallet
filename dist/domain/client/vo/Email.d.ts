import { Result } from "../../../shared/utils/Result";
export declare class Email {
    private readonly value;
    private constructor();
    static create(email: string): Result<Email>;
    private static isValid;
    getValue(): string;
}
