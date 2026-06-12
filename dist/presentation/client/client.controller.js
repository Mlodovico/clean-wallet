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
exports.ClientController = void 0;
const common_1 = require("@nestjs/common");
const client_service_1 = require("./client.service");
const Client_1 = require("../../domain/client/Client");
let ClientController = class ClientController {
    clientService;
    constructor(clientService) {
        this.clientService = clientService;
    }
    findAll() {
        return this.clientService.findAll();
    }
    CreateNewClient(newClient) {
        return this.clientService.create(newClient);
    }
    updateClient(id, updateData) {
        return this.clientService.update(id, updateData);
    }
    findById(id) {
        return this.clientService.findOne(id);
    }
};
exports.ClientController = ClientController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], ClientController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Client_1.Client]),
    __metadata("design:returntype", Client_1.Client)
], ClientController.prototype, "CreateNewClient", null);
__decorate([
    (0, common_1.Put)(":id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Object)
], ClientController.prototype, "updateClient", null);
__decorate([
    (0, common_1.Get)(":id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], ClientController.prototype, "findById", null);
exports.ClientController = ClientController = __decorate([
    (0, common_1.Controller)("clients"),
    __metadata("design:paramtypes", [client_service_1.ClientService])
], ClientController);
//# sourceMappingURL=client.controller.js.map