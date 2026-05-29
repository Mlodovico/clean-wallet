"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const Client_1 = require("../../domain/client/Client");
let ClientService = class ClientService {
    clients = [];
    findAll() {
        return this.clients;
    }
    create(clientData) {
        const clientResult = Client_1.Client.create({
            name: clientData.name.getValue(),
            phone: clientData.phone.getValue(),
            email: clientData.email.getValue(),
            birthDate: clientData.birthDate.getValue(),
            document: clientData.document.getValue(),
            password: clientData.password.getValue(),
            status: clientData.status.getValue(),
        });
        if (clientResult.isFailure) {
            throw new Error(`Failed to create client: ${clientResult.getError()}`);
        }
        const newClient = clientResult.getValue();
        this.clients.push(newClient);
        return newClient;
    }
    findOne(id) {
        return this.clients.find((client) => client.id.getValue() === id);
    }
    update(id, updateData) {
        const clientIndex = this.clients.findIndex((client) => client.id.getValue() === id);
        if (clientIndex === -1) {
            return undefined;
        }
        const updatedClient = {
            ...this.clients[clientIndex],
            ...updateData,
            updatedAt: new Date(),
        };
        this.clients[clientIndex] = updatedClient;
        return updatedClient;
    }
};
exports.ClientService = ClientService;
exports.ClientService = ClientService = __decorate([
    (0, common_1.Injectable)()
], ClientService);
//# sourceMappingURL=client.service.js.map