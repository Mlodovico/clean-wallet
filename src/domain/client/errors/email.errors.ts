export class EmailErrors extends Error {
  static emailAlreadyInUse(): EmailErrors {
    return new EmailErrors("Client email already in use");
  }
}
