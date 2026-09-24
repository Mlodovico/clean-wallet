import { Result } from "src/shared/utils/Result";

import { Birthdate } from "./vo/Birthdate";
import { ClientId } from "./vo/ClientId";
import { Email } from "./vo/Email";
import { Name } from "./vo/Name";
import { Password } from "./vo/Password";
import { Phone } from "./vo/Phone";
import { Status } from "./vo/Status";
import { ClientDocument } from "./vo/ClientDocument";

type RawClientProps = {
  name: string;
  phone: string;
  email: string;
  birthDate: Date | string;
  document: string;
  password: string;
  status: string;
};

type ReconstituteClientProps = RawClientProps & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
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
    const idResult = ClientId.create();
    if (idResult.isFailure) {
      return Result.fail<Client>(`Invalid client id: ${idResult.getError()}`);
    }

    const now = new Date();

    return Client.build({
      ...props,
      id: idResult.getValue().getValue(),
      createdAt: now,
      updatedAt: now,
    });
  }

  static reconstitute(props: ReconstituteClientProps): Result<Client> {
    return Client.build(props);
  }

  update(changes: Partial<RawClientProps>): Result<Client> {
    return Client.build({
      id: this.id.getValue(),
      name: changes.name ?? this.name.getValue(),
      phone: changes.phone ?? this.phone.getValue(),
      email: changes.email ?? this.email.getValue(),
      birthDate: changes.birthDate ?? this.birthDate.getValue(),
      document: changes.document ?? this.document.getValue(),
      password: changes.password ?? this.password.getValue(),
      status: changes.status ?? this.status.getValue(),
      createdAt: this.createdAt,
      updatedAt: new Date(),
    });
  }

  static activate(client: Client): Client {
    if (client.status.asString === "active") {
      throw new Error("Client is already active");
    }

    const statusResult = Status.create("active");
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
    if (client.status.asString === "inactive") {
      throw new Error("Client is already inactive");
    }

    const statusResult = Status.create("deactive");
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

  private static build(props: ReconstituteClientProps): Result<Client> {
    const idResult = ClientId.create(props.id);
    if (idResult.isFailure) {
      return Result.fail<Client>(`Invalid client id: ${idResult.getError()}`);
    }

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
        idResult.getValue(),
        nameResult.getValue(),
        phoneResult.getValue(),
        emailResult.getValue(),
        birthDateResult.getValue(),
        documentResult.getValue(),
        passwordResult.getValue(),
        statusResult.getValue(),
        props.createdAt,
        props.updatedAt,
      ),
    );
  }
}
