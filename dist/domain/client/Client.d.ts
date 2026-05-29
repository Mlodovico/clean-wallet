import { Result } from 'src/shared/utils/Result';
import { Birthdate } from './vo/Birthdate';
import { ClientId } from './vo/ClientId';
import { Email } from './vo/Email';
import { Name } from './vo/Name';
import { Password } from './vo/Password';
import { Phone } from './vo/Phone';
import { Status } from './vo/Status';
import { ClientDocument } from './vo/ClientDocument';
type RawClientProps = {
    name: string;
    phone: string;
    email: string;
    birthDate: Date;
    document: string;
    password: string;
    status: string;
};
export declare class Client {
    readonly id: ClientId;
    readonly name: Name;
    readonly phone: Phone;
    readonly email: Email;
    readonly birthDate: Birthdate;
    readonly document: ClientDocument;
    readonly password: Password;
    readonly status: Status;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(id: ClientId, name: Name, phone: Phone, email: Email, birthDate: Birthdate, document: ClientDocument, password: Password, status: Status, createdAt: Date, updatedAt: Date);
    static create(props: RawClientProps): Result<Client>;
    static activate(client: Client): Client;
    static deactivate(client: Client): Client;
}
export {};
