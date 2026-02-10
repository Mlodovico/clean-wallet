// import { v4 as uuidv4 } from 'uuid';

const { randomUUID: uuidv4 } = require('crypto');

export class Client {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly phone: string,
        public readonly email: string,
        public readonly birthDate: Date,
        public readonly document: string,
        public readonly password: string,
        public readonly status: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    static create(props: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Client {

        this.validateBirthDate(props.birthDate);
        this.validateDocument(props.document);

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

    static validateDocument(document: string): void {
        if (document.length !== 11) {
            throw new Error('Document must be 11 digits');
        }
    }

    static validateBirthDate(birthDate: Date): void {
        const today = new Date();
        const minAge = new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate(),
        );
        if (birthDate > minAge) {
            throw new Error('Client must be at least 18 years old');
        }
    }
}
