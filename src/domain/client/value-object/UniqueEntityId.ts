export class UniqueEntityId {
  private readonly id: string;

  constructor(id: string) {
    this.id = id;
  }

  static generate(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  static isValid(id: string): boolean {
    // Validation logic here
    return true;
  }
}
