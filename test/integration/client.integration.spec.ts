import { ClientService } from 'src/presentation/client/client.service';
import { Client } from 'src/domain/client/Client';
import { Name } from 'src/domain/client/vo/Name';
import { Phone } from 'src/domain/client/vo/Phone';
import { Email } from 'src/domain/client/vo/Email';
import { Birthdate } from 'src/domain/client/vo/Birthdate';
import { ClientDocument } from 'src/domain/client/vo/ClientDocument';
import { Password } from 'src/domain/client/vo/Password';
import { Status } from 'src/domain/client/vo/Status';
import { beforeEach, describe, it } from 'node:test';

describe('Client Integration', () => {
  let clientService: ClientService;

  beforeEach(() => {
    clientService = new ClientService();
  });

  it('should create a client successfully', () => {
    const clientData = {
      name: 'John Doe',
      phone: '+123456789',
      email: 'john.doe@example.com',
      birthDate: new Date('1990-01-01'),
      document: '12345678901',
      password: 'SecureP@ssw0rd',
      status: 'active',
    };

    const client = clientService.create(Client.create(clientData).getValue());

    expect(client).toBeDefined();
    expect(client.name.getValue()).toBe('John Doe');
    expect(client.phone.getValue()).toBe('+123456789');
    expect(client.email.getValue()).toBe('john.doe@example.com');
    expect(client.birthDate.getValue()).toEqual(new Date('1990-01-01'));
    expect(client.document.getValue()).toBe('12345678901');
    expect(client.password.getValue()).toBe('SecureP@ssw0rd');
    expect(client.status.getValue()).toBe('active');
  });

  it('should find a client by ID', () => {
    const clientData = {
      name: 'Jane Doe',
      phone: '+987654321',
      email: 'jane.doe@example.com',
      birthDate: new Date('1985-05-15'),
      document: '98765432101',
      password: 'AnotherP@ssw0rd',
      status: 'active',
    };

    const client = clientService.create(Client.create(clientData).getValue());

    const foundClient = clientService.findOne(client.id.getValue());

    expect(foundClient).toBeDefined();
    expect(foundClient?.name.getValue()).toBe('Jane Doe');
  });

  it('should update a client successfully', () => {
    const clientData = {
      name: 'John Smith',
      phone: '+111222333',
      email: 'john.smith@example.com',
      birthDate: new Date('1995-03-10'),
      document: '11122233344',
      password: 'Password123',
      status: 'inactive',
    };

    const client = clientService.create(Client.create(clientData).getValue());

    const updatedClient = clientService.update(client.id.getValue(), {
      name: Name.create('John Updated').getValue(),
      phone: Phone.create('+444555666').getValue(),
    });

    expect(updatedClient).toBeDefined();
    expect(updatedClient?.name.getValue()).toBe('John Updated');
    expect(updatedClient?.phone.getValue()).toBe('+444555666');
    expect(updatedClient?.email.getValue()).toBe('john.smith@example.com'); // Unchanged
  });

  it('should return undefined when trying to find a non-existent client', () => {
    const foundClient = clientService.findOne('non-existent-id');
    expect(foundClient).toBeUndefined();
  });

  it('should return undefined when trying to update a non-existent client', () => {
    const updatedClient = clientService.update('non-existent-id', {
      name: Name.create('Non Existent').getValue(),
    });
    expect(updatedClient).toBeUndefined();
  });
});
function expect(client: Client) {
  throw new Error('Function not implemented.');
}
