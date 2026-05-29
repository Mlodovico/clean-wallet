import { Result } from 'src/shared/utils/Result';
export declare class WalletType {
    private readonly value;
    private constructor();
    static create(type: string): Result<WalletType>;
    getValue(): string;
}
