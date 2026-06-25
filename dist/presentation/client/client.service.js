"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const create_client_use_case_1 = require("../../application/client/create-client.use-case");
let ClientService = class ClientService {
    createClientUseCase;
    clients = [];
    constructor(createClientUseCase) {
        this.createClientUseCase = createClientUseCase;
    }
    findAll() {
        return this.clients;
    }
    async create(clientData) {
        const newClient = await this.createClientUseCase.execute(clientData);
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
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [create_client_use_case_1.CreateClientUseCase])
], ClientService);
//# sourceMappingURL=client.service.js.map