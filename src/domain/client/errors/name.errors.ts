export class NameErrors extends Error {
  static nameCannotBeEmpty(): NameErrors {
    return new NameErrors('Name cannot be empty');
  }

  static nameCannotExceed100Characters(): NameErrors {
    return new NameErrors('Name cannot exceed 100 characters');
  }
}
