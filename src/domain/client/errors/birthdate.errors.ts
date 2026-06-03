export class BirthdateErrors extends Error {
  constructor(message: string) {
    super(message);
    this.name = "birthdateErrors";
  }

  static birthdateMustBeValidDate(): BirthdateErrors {
    return new BirthdateErrors("Birthdate must be a valid date.");
  }

  static invalidBirthdateFormate(): BirthdateErrors {
    return new BirthdateErrors("Invalid birthdate format.");
  }

  static birthdateMustBeInThePast(): BirthdateErrors {
    return new BirthdateErrors("Birthdate must be in the past.");
  }

  static birthdateMustNotBeEmpty(): BirthdateErrors {
    return new BirthdateErrors("Birthdate must not be empty.");
  }

  static birthdateMustBeAtLeast18YearsOld(minAge: string): BirthdateErrors {
    return new BirthdateErrors(`Client must be at least ${minAge} years old.`);
  }

  static birthdateMustNotExceedMaximumAge(maxAge: string): BirthdateErrors {
    return new BirthdateErrors(`Client cannot be older than ${maxAge} years.`);
  }
}
