import { Result } from 'src/shared/utils/Result';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { ClientIdErrors } from '../errors/clientid.errors';

export class ClientId {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value?: string): Result<ClientId> {
    const id = value || uuidv4();

    if (!uuidValidate(id)) {
      return Result.fail<ClientId>(
        ClientIdErrors.clientIdMustBeValidUUID().message,
      );
    }

    return Result.ok<ClientId>(new ClientId(id));
  }

  getValue(): string {
    return this.value;
  }

  equals(other: ClientId): boolean {
    return this.value === other.value;
  }
}
