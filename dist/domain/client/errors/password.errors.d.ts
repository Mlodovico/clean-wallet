export declare class PasswordErrors extends Error {
    static passwordCannotBeEmpty(): PasswordErrors;
    static passwordValidationFailed(): PasswordErrors;
    static passwordMustBeAtLeast6Characters(): PasswordErrors;
    static passwordMustContainNumber(): PasswordErrors;
    static passwordMustContainSpecialCharacter(): PasswordErrors;
    static passwordMinLengthExceeded(minLength: string): PasswordErrors;
    static passwordMaxLengthExceeded(maxLength: string): PasswordErrors;
    static passwordCannotContainSpaces(): PasswordErrors;
    static passwordMustMeetComplexityRequirements(): PasswordErrors;
}
