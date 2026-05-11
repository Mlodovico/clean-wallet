export class ClientIdErrors extends Error {
  static clientIdMustBeValidUUID(): Error {
    return new Error('Invalid ClientId format. It must be a valid UUID.');
  }
}
