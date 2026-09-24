export class DocumentErrors extends Error {
  static invalidDocumentFormat(): DocumentErrors {
    return new DocumentErrors("Invalid document format");
  }

  static documentAlreadyInUse(): DocumentErrors {
    return new DocumentErrors("Client document already in use");
  }
}
