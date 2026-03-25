import { UniqueEntityId } from './UniqueEntityId';

export class ClientId extends UniqueEntityId {
  private readonly value: string;

  constructor(value: string) {
    super(value);
    this.value = value;
  }

  static create(value?: string): ClientId {
    const id = value || UniqueEntityId.generate();

    if (!UniqueEntityId.isValid(id)) {
      throw new Error('Invalid ClientId format');
    }

    return new ClientId(id);
  }

  equals(other: ClientId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
