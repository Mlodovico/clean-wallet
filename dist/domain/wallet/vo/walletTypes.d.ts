import { Result } from "../../../shared/utils/Result";
import { WalletTypesErrors } from "../errors/walletTypes.errors";
export declare class WalletType {
    private readonly value;
    private constructor();
    static walletTypeErrors: typeof WalletTypesErrors;
    static create(type: string): Result<WalletType>;
    getValue(): string;
}
