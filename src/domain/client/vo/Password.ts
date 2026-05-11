import { Result } from '../../../shared/utils/Result';
import { PasswordErrors } from '../errors/password.errors';

export class Password {
  private static readonly MIN_LENGTH = 8;
  private static readonly MAX_LENGTH = 64;
  private static readonly COMMON_PASSWORDS = new Set([
    '123456',
    'password',
    'qwerty',
    '12345678',
    'abc123',
    '111111',
    '123123',
  ]);

  private constructor(private readonly value: string) {}

  static create(password: string): Result<Password> {
    const validationResult = this.validate(password);
    if (!validationResult.isSuccess) {
      return Result.fail<Password>(
        PasswordErrors.passwordValidationFailed().message,
      );
    }

    return Result.ok<Password>(new Password(password));
  }

  private static validate(password: string): Result<void> {
    if (password.length < this.MIN_LENGTH) {
      return Result.fail<void>(
        PasswordErrors.passwordMinLengthExceeded(this.MIN_LENGTH.toString())
          .message,
      );
    }

    if (password.length > this.MAX_LENGTH) {
      return Result.fail<void>(
        PasswordErrors.passwordMaxLengthExceeded(this.MAX_LENGTH.toString())
          .message,
      );
    }

    if (/\s/.test(password)) {
      return Result.fail<void>(
        PasswordErrors.passwordCannotContainSpaces().message,
      );
    }

    if (!this.meetsComplexity(password)) {
      return Result.fail<void>(
        PasswordErrors.passwordMustMeetComplexityRequirements().message,
      );
    }

    if (this.COMMON_PASSWORDS.has(password)) {
      return Result.fail<void>(
        PasswordErrors.passwordValidationFailed().message,
      );
    }

    return Result.ok<void>();
  }

  private static meetsComplexity(password: string): boolean {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialCharacter;
  }

  get asString(): string {
    return this.value;
  }

  getValue(): string {
    return this.value;
  }
}
