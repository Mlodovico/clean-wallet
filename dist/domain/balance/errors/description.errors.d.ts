export declare class DescriptionErrors extends Error {
    constructor(message: string);
    static descriptionMustBeString(): DescriptionErrors;
    static descriptionMustNotBeEmptyString(): DescriptionErrors;
    static descriptionMustNotBeTooLong(): DescriptionErrors;
}
