import { Result } from '../../../shared/utils/Result';
export declare class Status {
    private readonly value;
    private static readonly ALLOWED_STATUSES;
    private constructor();
    static create(status: string): Result<Status>;
    get asString(): string;
    getValue(): string;
}
