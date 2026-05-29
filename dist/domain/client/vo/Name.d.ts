import { Result } from '../../../shared/utils/Result';
export declare class Name {
    readonly value: string;
    private constructor();
    static create(name: string): Result<Name>;
    getValue(): string;
}
