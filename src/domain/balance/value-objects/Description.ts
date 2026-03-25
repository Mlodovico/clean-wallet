import { DescriptionErrors } from "../errors/description.errors";

export class Description {
    private constructor(private readonly value: string) {}
    static descriptionErrors = DescriptionErrors;

    static create(value: string): Description {
        if (!Description.isValidDescription(value)) {
            throw this.descriptionErrors.descriptionMustBeString();
        }

        if (Description.isEmpty(value)) {
            throw this.descriptionErrors.descriptionMustNotBeEmptyString();
        }

        if (Description.isTooLong(value)) {
            throw this.descriptionErrors.descriptionMustNotBeTooLong();
        }

        return new Description(value);
    }
    
    static isValidDescription(value: string): boolean {
        return typeof value === 'string' && value.length > 0;
    }

    static isEmpty(value: string): boolean {
        return value.length === 0;
    }

    static isTooLong(value: string): boolean {
        return value.length > 255;
    }

    getValue(): string {
        return this.value;
    }
}