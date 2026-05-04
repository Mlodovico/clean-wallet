import { Result } from '../../../shared/utils/Result';

export class Birthdate {
  private static readonly MIN_AGE_YEARS = 18;
  private static readonly MAX_AGE_YEARS = 100;

  private constructor(private readonly value: Date) {}

  static create(birthdate: Date | string): Result<Birthdate> {
    const date =
      typeof birthdate === 'string' ? new Date(birthdate) : birthdate;

    if (isNaN(date.getTime())) {
      return Result.fail<Birthdate>('Invalid birthdate format');
    }

    if (this.isInFuture(date)) {
      return Result.fail<Birthdate>('Birthdate cannot be in the future');
    }

    if (!this.hasMinimumAge(date)) {
      return Result.fail<Birthdate>(
        `Client must be at least ${this.MIN_AGE_YEARS} years old`,
      );
    }

    if (this.exceedsMaximumAge(date)) {
      return Result.fail<Birthdate>(
        `Client cannot be older than ${this.MAX_AGE_YEARS} years`,
      );
    }

    return Result.ok<Birthdate>(new Birthdate(date));
  }

  get asDate(): Date {
    return new Date(this.value);
  }

  get age(): number {
    const today = new Date();
    let age = today.getFullYear() - this.value.getFullYear();
    const monthDiff = today.getMonth() - this.value.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < this.value.getDate())
    ) {
      age--;
    }

    return age;
  }

  get toString(): string {
    return this.value.toISOString().split('T')[0];
  }

  private static isInFuture(birthdate: Date): boolean {
    return birthdate > new Date();
  }

  private static hasMinimumAge(birthdate: Date): boolean {
    const today = new Date();
    const minAgeDate = new Date(
      today.getFullYear() - this.MIN_AGE_YEARS,
      today.getMonth(),
      today.getDate(),
    );

    return birthdate <= minAgeDate;
  }

  private static exceedsMaximumAge(birthdate: Date): boolean {
    const today = new Date();
    const maxAgeDate = new Date(
      today.getFullYear() - this.MAX_AGE_YEARS,
      today.getMonth(),
      today.getDate(),
    );

    return birthdate < maxAgeDate;
  }
}
