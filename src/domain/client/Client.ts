import { Result } from "src/shared/utils/Result";

import { StatusErrors } from "./errors/status.errors";
import { Birthdate } from "./vo/Birthdate";
import { ClientId } from "./vo/ClientId";
import { Email } from "./vo/Email";
import { Name } from "./vo/Name";
import { PasswordHash } from "./vo/PasswordHash";
import { Phone } from "./vo/Phone";
import { Status } from "./vo/Status";
import { ClientDocument } from "./vo/ClientDocument";

type RawClientProps = {
  name: string;
  phone: string;
  email: string;
  birthDate: Date | string;
  document: string;
  passwordHash: string;
  status: string;
};

export type CreateClientProps = Omit<RawClientProps, "status">;

export type ClientProfileChanges = Partial<
  Omit<RawClientProps, "passwordHash" | "status">
>;

type ReconstituteClientProps = RawClientProps & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ClientStatusValue = "pending" | "active" | "suspended" | "inactive";

const ALLOWED_TRANSITIONS: Record<ClientStatusValue, ClientStatusValue[]> = {
  pending: ["active", "inactive"],
  active: ["suspended", "inactive"],
  suspended: ["active", "inactive"],
  inactive: [],
};

export class Client {
  constructor(
    public readonly id: ClientId,
    public readonly name: Name,
    public readonly phone: Phone,
    public readonly email: Email,
    public readonly birthDate: Birthdate,
    public readonly document: ClientDocument,
    public readonly passwordHash: PasswordHash,
    public readonly status: Status,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  // Melhoria: montar erros customizados

  static create(props: CreateClientProps): Result<Client> {
    const idResult = ClientId.create();
    if (idResult.isFailure) {
      return Result.fail<Client>(`Invalid client id: ${idResult.getError()}`);
    }

    const now = new Date();

    return Client.build({
      ...props,
      status: "pending",
      id: idResult.getValue().getValue(),
      createdAt: now,
      updatedAt: now,
    });
  }

  static reconstitute(props: ReconstituteClientProps): Result<Client> {
    return Client.build(props);
  }

  get isActive(): boolean {
    return this.status.getValue() === "active";
  }

  get isInactive(): boolean {
    return this.status.getValue() === "inactive";
  }

  update(changes: ClientProfileChanges): Result<Client> {
    if (this.isInactive) {
      return Result.fail<Client>(StatusErrors.clientIsInactive().message);
    }

    return this.rebuild({
      name: changes.name,
      phone: changes.phone,
      email: changes.email,
      birthDate: changes.birthDate,
      document: changes.document,
    });
  }

  changePassword(newPasswordHash: string): Result<Client> {
    if (this.isInactive) {
      return Result.fail<Client>(StatusErrors.clientIsInactive().message);
    }

    return this.rebuild({ passwordHash: newPasswordHash });
  }

  activate(): Result<Client> {
    return this.transitionTo("active");
  }

  suspend(): Result<Client> {
    return this.transitionTo("suspended");
  }

  deactivate(): Result<Client> {
    return this.transitionTo("inactive");
  }

  toJSON(): Record<string, unknown> {
    return Object.fromEntries(
      Object.entries(this).filter(([key]) => key !== "passwordHash"),
    );
  }

  private transitionTo(next: ClientStatusValue): Result<Client> {
    const current = this.status.getValue() as ClientStatusValue;

    if (!ALLOWED_TRANSITIONS[current]?.includes(next)) {
      return Result.fail<Client>(
        StatusErrors.invalidTransition(current, next).message,
      );
    }

    return this.rebuild({ status: next });
  }

  private rebuild(changes: Partial<RawClientProps>): Result<Client> {
    return Client.build({
      id: this.id.getValue(),
      name: changes.name ?? this.name.getValue(),
      phone: changes.phone ?? this.phone.getValue(),
      email: changes.email ?? this.email.getValue(),
      birthDate: changes.birthDate ?? this.birthDate.getValue(),
      document: changes.document ?? this.document.getValue(),
      passwordHash: changes.passwordHash ?? this.passwordHash.getValue(),
      status: changes.status ?? this.status.getValue(),
      createdAt: this.createdAt,
      updatedAt: new Date(),
    });
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

    const passwordHashResult = PasswordHash.create(props.passwordHash);
    if (passwordHashResult.isFailure) {
      return Result.fail<Client>(
        `Invalid password: ${passwordHashResult.getError()}`,
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
        passwordHashResult.getValue(),
        statusResult.getValue(),
        props.createdAt,
        props.updatedAt,
      ),
    );
  }
}
