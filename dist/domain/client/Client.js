"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const Result_1 = require("../../shared/utils/Result");
const status_errors_1 = require("./errors/status.errors");
const Birthdate_1 = require("./vo/Birthdate");
const ClientId_1 = require("./vo/ClientId");
const Email_1 = require("./vo/Email");
const Name_1 = require("./vo/Name");
const PasswordHash_1 = require("./vo/PasswordHash");
const Phone_1 = require("./vo/Phone");
const Status_1 = require("./vo/Status");
const ClientDocument_1 = require("./vo/ClientDocument");
const ALLOWED_TRANSITIONS = {
    pending: ["active", "inactive"],
    active: ["suspended", "inactive"],
    suspended: ["active", "inactive"],
    inactive: [],
};
class Client {
    id;
    name;
    phone;
    email;
    birthDate;
    document;
    passwordHash;
    status;
    createdAt;
    updatedAt;
    constructor(id, name, phone, email, birthDate, document, passwordHash, status, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.birthDate = birthDate;
        this.document = document;
        this.passwordHash = passwordHash;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static create(props) {
        const idResult = ClientId_1.ClientId.create();
        if (idResult.isFailure) {
            return Result_1.Result.fail(`Invalid client id: ${idResult.getError()}`);
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
    static reconstitute(props) {
        return Client.build(props);
    }
    get isActive() {
        return this.status.getValue() === "active";
    }
    get isInactive() {
        return this.status.getValue() === "inactive";
    }
    update(changes) {
        if (this.isInactive) {
            return Result_1.Result.fail(status_errors_1.StatusErrors.clientIsInactive().message);
        }
        return this.rebuild({
            name: changes.name,
            phone: changes.phone,
            email: changes.email,
            birthDate: changes.birthDate,
            document: changes.document,
        });
    }
    changePassword(newPasswordHash) {
        if (this.isInactive) {
            return Result_1.Result.fail(status_errors_1.StatusErrors.clientIsInactive().message);
        }
        return this.rebuild({ passwordHash: newPasswordHash });
    }
    activate() {
        return this.transitionTo("active");
    }
    suspend() {
        return this.transitionTo("suspended");
    }
    deactivate() {
        return this.transitionTo("inactive");
    }
    toJSON() {
        return Object.fromEntries(Object.entries(this).filter(([key]) => key !== "passwordHash"));
    }
    transitionTo(next) {
        const current = this.status.getValue();
        if (!ALLOWED_TRANSITIONS[current]?.includes(next)) {
            return Result_1.Result.fail(status_errors_1.StatusErrors.invalidTransition(current, next).message);
        }
        return this.rebuild({ status: next });
    }
    rebuild(changes) {
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
    static build(props) {
        const idResult = ClientId_1.ClientId.create(props.id);
        if (idResult.isFailure) {
            return Result_1.Result.fail(`Invalid client id: ${idResult.getError()}`);
        }
        const nameResult = Name_1.Name.create(props.name);
        if (nameResult.isFailure) {
            return Result_1.Result.fail(`Invalid name: ${nameResult.getError()}`);
        }
        const phoneResult = Phone_1.Phone.create(props.phone);
        if (phoneResult.isFailure) {
            return Result_1.Result.fail(`Invalid phone: ${phoneResult.getError()}`);
        }
        const emailResult = Email_1.Email.create(props.email);
        if (emailResult.isFailure) {
            return Result_1.Result.fail(`Invalid email: ${emailResult.getError()}`);
        }
        const birthDateResult = Birthdate_1.Birthdate.create(props.birthDate);
        if (birthDateResult.isFailure) {
            return Result_1.Result.fail(`Invalid birth date: ${birthDateResult.getError()}`);
        }
        const documentResult = ClientDocument_1.ClientDocument.create(props.document);
        if (documentResult.isFailure) {
            return Result_1.Result.fail(`Invalid document: ${documentResult.getError()}`);
        }
        const passwordHashResult = PasswordHash_1.PasswordHash.create(props.passwordHash);
        if (passwordHashResult.isFailure) {
            return Result_1.Result.fail(`Invalid password: ${passwordHashResult.getError()}`);
        }
        const statusResult = Status_1.Status.create(props.status);
        if (statusResult.isFailure) {
            return Result_1.Result.fail(`Invalid status: ${statusResult.getError()}`);
        }
        return Result_1.Result.ok(new Client(idResult.getValue(), nameResult.getValue(), phoneResult.getValue(), emailResult.getValue(), birthDateResult.getValue(), documentResult.getValue(), passwordHashResult.getValue(), statusResult.getValue(), props.createdAt, props.updatedAt));
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map