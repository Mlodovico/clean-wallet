import { Result } from '../../../shared/utils/Result';
export declare class Phone {
    private readonly value;
    private constructor();
    static create(phone: string): Result<Phone>;
    getValue(): string;
    getFormatted(): string;
}
