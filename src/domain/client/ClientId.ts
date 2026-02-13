import { UniqueEntityId } from './UniqueEntityId';

export class ClientId extends UniqueEntityId {
  constructor(value?: string) {
    super(value);
  }
}
