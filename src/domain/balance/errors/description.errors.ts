
export class DescriptionErrors extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DescriptionErrors';
    }

    static descriptionMustBeString(): DescriptionErrors {
        return new DescriptionErrors('Description must be a string');
    }

    static descriptionMustNotBeEmptyString(): DescriptionErrors {
        return new DescriptionErrors('Description must not be an empty string');
    }
    
    static descriptionMustNotBeTooLong(): DescriptionErrors {
        return new DescriptionErrors('Description must not be too long');
    }
}