"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const Result_1 = require("src/shared/utils/Result");
const Birthdate_1 = require("./vo/Birthdate");
const ClientId_1 = require("./vo/ClientId");
const Email_1 = require("./vo/Email");
const Name_1 = require("./vo/Name");
const Password_1 = require("./vo/Password");
const Phone_1 = require("./vo/Phone");
const Status_1 = require("./vo/Status");
const ClientDocument_1 = require("./vo/ClientDocument");
class Client {
    id;
    name;
    phone;
    email;
    birthDate;
    document;
    password;
    status;
    createdAt;
    updatedAt;
    constructor(id, name, phone, email, birthDate, document, password, status, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.birthDate = birthDate;
        this.document = document;
        this.password = password;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static create(props) {
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
        const passwordResult = Password_1.Password.create(props.password);
        if (passwordResult.isFailure) {
            return Result_1.Result.fail(`Invalid password: ${passwordResult.getError()}`);
        }
        const statusResult = Status_1.Status.create(props.status);
        if (statusResult.isFailure) {
            return Result_1.Result.fail(`Invalid status: ${statusResult.getError()}`);
        }
        return Result_1.Result.ok(new Client(ClientId_1.ClientId.create().getValue(), nameResult.getValue(), phoneResult.getValue(), emailResult.getValue(), birthDateResult.getValue(), documentResult.getValue(), passwordResult.getValue(), statusResult.getValue(), new Date(), new Date()));
    }
    static activate(client) {
        if (client.status.asString === "active") {
            throw new Error("Client is already active");
        }
        const statusResult = Status_1.Status.create("active");
        if (statusResult.isFailure) {
            throw new Error(`Failed to activate client: ${statusResult.getError()}`);
        }
        return new Client(client.id, client.name, client.phone, client.email, client.birthDate, client.document, client.password, client.status, client.createdAt, client.updatedAt);
    }
    static deactivate(client) {
        if (client.status.asString === "inactive") {
            throw new Error("Client is already inactive");
        }
        const statusResult = Status_1.Status.create("deactive");
        if (statusResult.isFailure) {
            throw new Error(`Failed to deactive client: ${statusResult.isFailure}`);
        }
        return new Client(client.id, client.name, client.phone, client.email, client.birthDate, client.document, client.password, client.status, client.createdAt, client.updatedAt);
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map