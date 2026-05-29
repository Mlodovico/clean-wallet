import { Result } from 'src/shared/utils/Result';
export declare class WalletLimit {
    private readonly value;
    private constructor();
    static create(limit: number): Result<WalletLimit>;
    getValue(): number;
}
