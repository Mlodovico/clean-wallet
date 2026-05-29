import { Result } from 'src/shared/utils/Result';
export declare class WalletId {
    private readonly value;
    private constructor();
    static create(id: string): Result<WalletId>;
    getValue(): string;
}
