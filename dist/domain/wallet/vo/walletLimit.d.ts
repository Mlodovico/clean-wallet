import { Result } from "../../../shared/utils/Result";
import { WalletLimitErrors } from "../errors/walletLimit.errors";
export declare class WalletLimit {
    private readonly value;
    private constructor();
    static walletLimitErrors: typeof WalletLimitErrors;
    static create(limit: number): Result<WalletLimit>;
    getValue(): number;
}
