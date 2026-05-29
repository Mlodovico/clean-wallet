export declare class BirthdateErrors extends Error {
    constructor(message: string);
    static birthdateMustBeValidDate(): BirthdateErrors;
    static invalidBirthdateFormate(): BirthdateErrors;
    static birthdateMustBeInThePast(): BirthdateErrors;
    static birthdateMustNotBeEmpty(): BirthdateErrors;
    static birthdateMustBeAtLeast18YearsOld(minAge: string): BirthdateErrors;
    static birthdateMustNotExceedMaximumAge(maxAge: string): BirthdateErrors;
}
