import { Result } from "../../../shared/utils/Result";
import { PasswordErrors } from "../errors/password.errors";

export class PasswordHash {
  private constructor(private readonly value: string) {}

  static create(hash: string): Result<PasswordHash> {
    if (!hash || !hash.trim()) {
      return Result.fail<PasswordHash>(
        PasswordErrors.passwordHashCannotBeEmpty().message,
      );
    }

    return Result.ok<PasswordHash>(new PasswordHash(hash));
  }

  getValue(): string {
    return this.value;
  }
}
