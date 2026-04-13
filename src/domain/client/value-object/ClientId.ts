import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export class ClientId {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value?: string): ClientId {
    const id = value || uuidv4();

    if (!uuidValidate(id)) {
      throw new Error('Invalid ClientId format');
    }

    return new ClientId(id);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: ClientId): boolean {
    return this.value === other.value;
  }
}
