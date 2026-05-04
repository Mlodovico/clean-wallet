import { Result } from '../../../shared/utils/Result';

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
      return Result.fail<Password>('Password validation failed');
    }
    return Result.ok<Password>(new Password(password));
  }

  private static validate(password: string): Result<void> {
    if (password.length < this.MIN_LENGTH) {
      return Result.fail<void>(
        `Password must be at least ${this.MIN_LENGTH} characters long`,
      );
    }

    if (password.length > this.MAX_LENGTH) {
      return Result.fail<void>(
        `Password must be no more than ${this.MAX_LENGTH} characters long`,
      );
    }

    if (/\s/.test(password)) {
      return Result.fail<void>('Password cannot contain spaces');
    }

    if (!this.meetsComplexity(password)) {
      return Result.fail<void>('Password must meet complexity requirements');
    }

    if (this.COMMON_PASSWORDS.has(password)) {
      return Result.fail<void>('Password is too common and insecure');
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
}
