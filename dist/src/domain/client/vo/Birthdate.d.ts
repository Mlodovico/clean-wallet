import { Result } from "../../../shared/utils/Result";
export declare class Birthdate {
    private readonly value;
    private static readonly MIN_AGE_YEARS;
    private static readonly MAX_AGE_YEARS;
    private constructor();
    static create(birthdate: Date | string): Result<Birthdate>;
    get asDate(): Date;
    get age(): number;
    get toString(): string;
    private static isInFuture;
    private static hasMinimumAge;
    private static exceedsMaximumAge;
    getValue(): Date;
}
