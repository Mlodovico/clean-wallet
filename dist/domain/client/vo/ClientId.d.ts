import { Result } from 'src/shared/utils/Result';
export declare class ClientId {
    private readonly value;
    private constructor();
    static create(value?: string): Result<ClientId>;
    getValue(): string;
    equals(other: ClientId): boolean;
}
