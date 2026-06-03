export class DocumentErrors extends Error {
  static invalidDocumentFormat(): DocumentErrors {
    return new DocumentErrors("Invalid document format");
  }
}
