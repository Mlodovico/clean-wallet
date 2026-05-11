export class PasswordErrors extends Error {
  static passwordCannotBeEmpty(): PasswordErrors {
    return new PasswordErrors('Password cannot be empty');
  }

  static passwordValidationFailed(): PasswordErrors {
    return new PasswordErrors('Password validation failed');
  }

  static passwordMustBeAtLeast6Characters(): PasswordErrors {
    return new PasswordErrors('Password must be at least 6 characters long');
  }

  static passwordMustContainNumber(): PasswordErrors {
    return new PasswordErrors('Password must contain at least one number');
  }

  static passwordMustContainSpecialCharacter(): PasswordErrors {
    return new PasswordErrors(
      'Password must contain at least one special character',
    );
  }

  static passwordMinLengthExceeded(minLength: string): PasswordErrors {
    return new PasswordErrors(
      `Password must be more than ${minLength} characters long`,
    );
  }

  static passwordMaxLengthExceeded(maxLength: string): PasswordErrors {
    return new PasswordErrors(
      `Password must be no more than ${maxLength} characters long`,
    );
  }

  static passwordCannotContainSpaces(): PasswordErrors {
    return new PasswordErrors('Password cannot contain spaces');
  }

  static passwordMustMeetComplexityRequirements(): PasswordErrors {
    return new PasswordErrors('Password must meet complexity requirements');
  }
}
