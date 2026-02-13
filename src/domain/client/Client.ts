import { Birthdate } from './Birthdate';
import { ClientId } from './ClientId';
import { Email } from './Email';
import { Phone } from './Phone';

const { randomUUID: uuidv4 } = require('crypto');

export class Client {
  constructor(
    public readonly id: ClientId,
    public readonly name: string,
    public readonly phone: Phone,
    public readonly email: Email,
    public readonly birthDate: Birthdate,
    public readonly document: Document,
    public readonly password: string,
    public readonly status: string,
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
    if (client.status === 'active') {
      throw new Error('Client is already active');
    }

    return new Client(
      client.id,
      client.name,
      client.phone,
      client.email,
      client.birthDate,
      client.document,
      client.password,
      'active',
      client.createdAt,
      client.updatedAt,
    );
  }

  static deactivate(client: Client): Client {
    if (client.status === 'inactive') {
      throw new Error('Client is already inactive');
    }

    return new Client(
      client.id,
      client.name,
      client.phone,
      client.email,
      client.birthDate,
      client.document,
      client.password,
      'inactive',
      client.createdAt,
      client.updatedAt,
    );
  }
}
