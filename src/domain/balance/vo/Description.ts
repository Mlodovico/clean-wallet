import { DescriptionErrors } from "../errors/description.errors";

import { Result } from "src/shared/utils/Result";

export class Description {
  private constructor(private readonly value: string) {}
  static descriptionErrors = DescriptionErrors;

  static create(value: string): Result<Description> {
    if (!Description.isValidDescription(value)) {
      return Result.fail<Description>(
        this.descriptionErrors.descriptionMustBeString().message,
      );
    }

    if (Description.isEmpty(value)) {
      return Result.fail<Description>(
        this.descriptionErrors.descriptionMustNotBeEmptyString().message,
      );
    }

    if (Description.isTooLong(value)) {
      return Result.fail<Description>(
        this.descriptionErrors.descriptionMustNotBeTooLong().message,
      );
    }

    return Result.ok<Description>(new Description(value));
  }

  static isValidDescription(value: string): boolean {
    return typeof value === "string" && value.length > 0;
  }

  static isEmpty(value: string): boolean {
    return value.length === 0;
  }

  static isTooLong(value: string): boolean {
    return value.length > 255;
  }

  getValue(): string {
    return this.value;
  }
}
