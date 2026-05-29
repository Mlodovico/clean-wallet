"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_service_1 = require("src/presentation/client/client.service");
const Client_1 = require("src/domain/client/Client");
const Name_1 = require("src/domain/client/vo/Name");
const Phone_1 = require("src/domain/client/vo/Phone");
const node_test_1 = require("node:test");
(0, node_test_1.describe)('Client Integration', () => {
    let clientService;
    (0, node_test_1.beforeEach)(() => {
        clientService = new client_service_1.ClientService();
    });
    (0, node_test_1.it)('should create a client successfully', () => {
        const clientData = {
            name: 'John Doe',
            phone: '+123456789',
            email: 'john.doe@example.com',
            birthDate: new Date('1990-01-01'),
            document: '12345678901',
            password: 'SecureP@ssw0rd',
            status: 'active',
        };
        const client = clientService.create(Client_1.Client.create(clientData).getValue());
        expect(client).toBeDefined();
        expect(client.name.getValue()).toBe('John Doe');
        expect(client.phone.getValue()).toBe('+123456789');
        expect(client.email.getValue()).toBe('john.doe@example.com');
        expect(client.birthDate.getValue()).toEqual(new Date('1990-01-01'));
        expect(client.document.getValue()).toBe('12345678901');
        expect(client.password.getValue()).toBe('SecureP@ssw0rd');
        expect(client.status.getValue()).toBe('active');
    });
    (0, node_test_1.it)('should find a client by ID', () => {
        const clientData = {
            name: 'Jane Doe',
            phone: '+987654321',
            email: 'jane.doe@example.com',
            birthDate: new Date('1985-05-15'),
            document: '98765432101',
            password: 'AnotherP@ssw0rd',
            status: 'active',
        };
        const client = clientService.create(Client_1.Client.create(clientData).getValue());
        const foundClient = clientService.findOne(client.id.getValue());
        expect(foundClient).toBeDefined();
        expect(foundClient?.name.getValue()).toBe('Jane Doe');
    });
    (0, node_test_1.it)('should update a client successfully', () => {
        const clientData = {
            name: 'John Smith',
            phone: '+111222333',
            email: 'john.smith@example.com',
            birthDate: new Date('1995-03-10'),
            document: '11122233344',
            password: 'Password123',
            status: 'inactive',
        };
        const client = clientService.create(Client_1.Client.create(clientData).getValue());
        const updatedClient = clientService.update(client.id.getValue(), {
            name: Name_1.Name.create('John Updated').getValue(),
            phone: Phone_1.Phone.create('+444555666').getValue(),
        });
        expect(updatedClient).toBeDefined();
        expect(updatedClient?.name.getValue()).toBe('John Updated');
        expect(updatedClient?.phone.getValue()).toBe('+444555666');
        expect(updatedClient?.email.getValue()).toBe('john.smith@example.com');
    });
    (0, node_test_1.it)('should return undefined when trying to find a non-existent client', () => {
        const foundClient = clientService.findOne('non-existent-id');
        expect(foundClient).toBeUndefined();
    });
    (0, node_test_1.it)('should return undefined when trying to update a non-existent client', () => {
        const updatedClient = clientService.update('non-existent-id', {
            name: Name_1.Name.create('Non Existent').getValue(),
        });
        expect(updatedClient).toBeUndefined();
    });
});
function expect(client) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=client.integration.spec.js.map