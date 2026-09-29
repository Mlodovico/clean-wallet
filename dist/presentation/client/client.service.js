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
const change_client_password_use_case_1 = require("../../application/client/change-client-password.use-case");
const change_client_status_use_case_1 = require("../../application/client/change-client-status.use-case");
const create_client_use_case_1 = require("../../application/client/create-client.use-case");
const find_client_use_case_1 = require("../../application/client/find-client.use-case");
const get_client_use_case_1 = require("../../application/client/get-client.use-case");
const update_client_use_case_1 = require("../../application/client/update-client.use-case");
let ClientService = class ClientService {
    createClientUseCase;
    getClientUseCase;
    updateClientUseCase;
    changeClientStatusUseCase;
    changeClientPasswordUseCase;
    findClientUseCase;
    clients = [];
    constructor(createClientUseCase, getClientUseCase, updateClientUseCase, changeClientStatusUseCase, changeClientPasswordUseCase, findClientUseCase) {
        this.createClientUseCase = createClientUseCase;
        this.getClientUseCase = getClientUseCase;
        this.updateClientUseCase = updateClientUseCase;
        this.changeClientStatusUseCase = changeClientStatusUseCase;
        this.changeClientPasswordUseCase = changeClientPasswordUseCase;
        this.findClientUseCase = findClientUseCase;
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
        return this.getClientUseCase.execute(id);
    }
    findBy(criteria) {
        return this.findClientUseCase.execute(criteria);
    }
    update(id, updateData) {
        return this.updateClientUseCase.execute({ id, ...updateData });
    }
    changeStatus(id, action) {
        return this.changeClientStatusUseCase.execute({ id, action });
    }
    changePassword(id, currentPassword, newPassword) {
        return this.changeClientPasswordUseCase.execute({
            id,
            currentPassword,
            newPassword,
        });
    }
};
exports.ClientService = ClientService;
exports.ClientService = ClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [create_client_use_case_1.CreateClientUseCase,
        get_client_use_case_1.GetClientUseCase,
        update_client_use_case_1.UpdateClientUseCase,
        change_client_status_use_case_1.ChangeClientStatusUseCase,
        change_client_password_use_case_1.ChangeClientPasswordUseCase,
        find_client_use_case_1.FindClientUseCase])
], ClientService);
//# sourceMappingURL=client.service.js.map