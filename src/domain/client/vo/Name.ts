import { Result } from '../../../shared/utils/Result';
import { NameErrors } from '../errors/name.errors';

export class Name {
  private constructor(readonly value: string) {}

  static create(name: string): Result<Name> {
    if (!name || name.trim().length === 0) {
      return Result.fail<Name>(NameErrors.nameCannotBeEmpty().message);
    }

    if (name.length > 100) {
      return Result.fail<Name>(
        NameErrors.nameCannotExceed100Characters().message,
      );
    }

    return Result.ok<Name>(new Name(name.trim()));
  }

  getValue(): string {
    return this.value;
  }
}
