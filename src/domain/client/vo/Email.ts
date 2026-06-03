import { Result } from "src/shared/utils/Result";

export class Email {
  private constructor(private readonly value: string) {}

  static create(email: string): Result<Email> {
    if (!this.isValid(email)) {
      return Result.fail<Email>("Invalid email format");
    }

    return Result.ok(new Email(email.toLocaleLowerCase().trim()));
  }

  private static isValid(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  getValue(): string {
    return this.value;
  }
}
