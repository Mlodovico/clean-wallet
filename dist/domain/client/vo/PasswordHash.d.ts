import { Result } from "../../../shared/utils/Result";
export declare class PasswordHash {
    private readonly value;
    private constructor();
    static create(hash: string): Result<PasswordHash>;
    getValue(): string;
}
