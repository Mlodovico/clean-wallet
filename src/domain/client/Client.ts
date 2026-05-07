import { Result } from 'src/shared/utils/Result';

import { Birthdate } from './value-object/Birthdate';
import { ClientId } from './value-object/ClientId';
import { Email } from './value-object/Email';
import { Name } from './value-object/Name';
import { Password } from './value-object/Password';
import { Phone } from './value-object/Phone';
import { Status } from './value-object/Status';
import { ClientDocument } from './value-object/ClientDocument';

type RawClientProps = {
  name: string;
  phone: string;
  email: string;
  birthDate: Date;
  document: string;
  password: string;
  status: string;
};

export class Client {
  constructor(
    public readonly id: ClientId,
    public readonly name: Name,
    public readonly phone: Phone,
    public readonly email: Email,
    public readonly birthDate: Birthdate,
    public readonly document: ClientDocument,
    public readonly password: Password,
    public readonly status: Status,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  // Melhoria: montar erros customizados

  static create(props: RawClientProps): Result<Client> {
    const nameResult = Name.create(props.name);
    if (nameResult.isFailure) {
      return Result.fail<Client>(`Invalid name: ${nameResult.getError()}`);
    }

    const phoneResult = Phone.create(props.phone);
    if (phoneResult.isFailure) {
      return Result.fail<Client>(`Invalid phone: ${phoneResult.getError()}`);
    }

    const emailResult = Email.create(props.email);
    if (emailResult.isFailure) {
      return Result.fail<Client>(`Invalid email: ${emailResult.getError()}`);
    }

    const birthDateResult = Birthdate.create(props.birthDate);
    if (birthDateResult.isFailure) {
      return Result.fail<Client>(
        `Invalid birth date: ${birthDateResult.getError()}`,
      );
    }

    const documentResult = ClientDocument.create(props.document);
    if (documentResult.isFailure) {
      return Result.fail<Client>(
        `Invalid document: ${documentResult.getError()}`,
      );
    }

    const passwordResult = Password.create(props.password);
    if (passwordResult.isFailure) {
      return Result.fail<Client>(
        `Invalid password: ${passwordResult.getError()}`,
      );
    }

    const statusResult = Status.create(props.status);
    if (statusResult.isFailure) {
      return Result.fail<Client>(`Invalid status: ${statusResult.getError()}`);
    }

    return Result.ok(
      new Client(
        ClientId.create(),
        nameResult.getValue(),
        phoneResult.getValue(),
        emailResult.getValue(),
        birthDateResult.getValue(),
        documentResult.getValue(),
        passwordResult.getValue(),
        statusResult.getValue(),
        new Date(),
        new Date(),
      ),
    );
  }

  static activate(client: Client): Client {
    if (client.status.asString === 'active') {
      throw new Error('Client is already active');
    }

    const statusResult = Status.create('active');
    if (statusResult.isFailure) {
      throw new Error(`Failed to activate client: ${statusResult.getError()}`);
    }

    return new Client(
      client.id,
      client.name,
      client.phone,
      client.email,
      client.birthDate,
      client.document,
      client.password,
      client.status,
      client.createdAt,
      client.updatedAt,
    );
  }

  static deactivate(client: Client): Client {
    if (client.status.asString === 'inactive') {
      throw new Error('Client is already inactive');
    }

    const statusResult = Status.create('deactive');
    if (statusResult.isFailure) {
      throw new Error(`Failed to deactive client: ${statusResult.isFailure}`);
    }

    return new Client(
      client.id,
      client.name,
      client.phone,
      client.email,
      client.birthDate,
      client.document,
      client.password,
      client.status,
      client.createdAt,
      client.updatedAt,
    );
  }
}
