import { Birthdate } from './Birthdate';
import { ClientId } from './ClientId';
import { Email } from './Email';
import { Password } from './Password';
import { Phone } from './Phone';
import { Status } from './Status';

const { randomUUID: uuidv4 } = require('crypto');

export class Client {
  constructor(
    public readonly id: ClientId,
    public readonly name: string,
    public readonly phone: Phone,
    public readonly email: Email,
    public readonly birthDate: Birthdate,
    public readonly document: Document,
    public readonly password: Password,
    public readonly status: Status,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(props: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Client {
    return new Client(
      uuidv4(),
      props.name,
      props.phone,
      props.email,
      props.birthDate,
      props.document,
      props.password,
      props.status,
      new Date(),
      new Date(),
    );
  }

  static activate(client: Client): Client {
    if (client.status.asString === 'active') {
      throw new Error('Client is already active');
    }

    const statusResult = Status.create('active');
    if (!statusResult.ok) {
      throw new Error(
        `Failed to activate client: ${statusResult.error.message}`,
      );
    }

    return new Client(
      client.id,
      client.name,
      client.phone,
      client.email,
      client.birthDate,
      client.document,
      client.password,
      statusResult.value,
      client.createdAt,
      client.updatedAt,
    );
  }

  static deactivate(client: Client): Client {
    if (client.status.asString === 'inactive') {
      throw new Error('Client is already inactive');
    }

    const statusResult = Status.create('deactive');
    if (!statusResult.ok) {
      throw new Error(
        `Failed to deactive client: ${statusResult.error.message}`,
      );
    }

    return new Client(
      client.id,
      client.name,
      client.phone,
      client.email,
      client.birthDate,
      client.document,
      client.password,
      statusResult.value,
      client.createdAt,
      client.updatedAt,
    );
  }
}
