import { DescriptionErrors } from "../errors/description.errors";
import { Result } from "../../../shared/utils/Result";
export declare class Description {
    private readonly value;
    private constructor();
    static descriptionErrors: typeof DescriptionErrors;
    static create(value: string): Result<Description>;
    static isValidDescription(value: string): boolean;
    static isEmpty(value: string): boolean;
    static isTooLong(value: string): boolean;
    getValue(): string;
}
