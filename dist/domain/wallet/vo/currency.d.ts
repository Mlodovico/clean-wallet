import { Result } from 'src/shared/utils/Result';
export declare class Currency {
    private readonly value;
    private constructor();
    static create(value: number): Result<Currency>;
    getValue(): number;
}
