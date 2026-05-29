import { Result } from 'src/shared/utils/Result';
export declare class ClientDocument {
    private readonly value;
    private constructor();
    static create(document: string): Result<ClientDocument>;
    private static isValidCPF;
    private static allDigitsEquals;
    private static verificationDigitCalc;
    getValue(): string;
}
