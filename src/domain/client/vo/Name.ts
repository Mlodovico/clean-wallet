import { Result } from '../../../shared/utils/Result';

export class Name {
  private constructor(readonly value: string) {}

  static create(name: string): Result<Name> {
    if (!name || name.trim().length === 0) {
      return Result.fail<Name>('Name cannot be empty');
    }

    if (name.length > 100) {
      return Result.fail<Name>('Name cannot exceed 100 characters');
    }

    return Result.ok<Name>(new Name(name.trim()));
  }

  getValue(): string {
    return this.value;
  }
}
