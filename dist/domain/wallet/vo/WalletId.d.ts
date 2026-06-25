import { Result } from "../../../shared/utils/Result";
import { WalletIdErrors } from "../errors/walletid.errors";
export declare class WalletId {
    private readonly value;
    private constructor();
    static walletIdErrors: typeof WalletIdErrors;
    static create(id: string): Result<WalletId>;
    static generate(): Result<WalletId>;
    getValue(): string;
}
