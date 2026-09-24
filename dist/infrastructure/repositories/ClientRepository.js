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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const retry_1 = require("../../shared/resilience/retry");
const Client_1 = require("../../domain/client/Client");
const client_entity_1 = require("../../domain/client/client.entity");
let ClientRepository = class ClientRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async save(record) {
        const saved = await (0, retry_1.withRetry)(() => this.repository.save(record));
        return this.toSavedRecord(saved);
    }
    async update(publicId, record) {
        const existing = await (0, retry_1.withRetry)(() => this.repository.findOneBy({ publicId }));
        if (!existing) {
            throw new Error("Client not found");
        }
        existing.name = record.name;
        existing.email = record.email;
        existing.phone = record.phone;
        existing.birthDate = record.birthDate;
        existing.document = record.document;
        existing.password = record.password;
        existing.status = record.status;
        const saved = await (0, retry_1.withRetry)(() => this.repository.save(existing));
        return this.toSavedRecord(saved);
    }
    async findById(publicId) {
        const entity = await (0, retry_1.withRetry)(() => this.repository.findOneBy({ publicId }));
        return entity ? this.toDomain(entity) : null;
    }
    async findByDocument(document) {
        const entity = await (0, retry_1.withRetry)(() => this.repository.findOneBy({ document }));
        return entity ? this.toDomain(entity) : null;
    }
    toSavedRecord(saved) {
        return {
            id: saved.id,
            publicId: saved.publicId,
            name: saved.name,
            email: saved.email,
            phone: saved.phone,
            birthDate: saved.birthDate,
            document: saved.document,
            password: saved.password,
            status: saved.status,
            createdAt: saved.createdAt,
            updatedAt: saved.updatedAt,
        };
    }
    toDomain(entity) {
        const result = Client_1.Client.reconstitute({
            id: entity.publicId,
            name: entity.name,
            email: entity.email,
            phone: entity.phone,
            birthDate: entity.birthDate,
            document: entity.document,
            password: entity.password,
            status: entity.status,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        });
        if (result.isFailure) {
            throw new Error(`Invalid persisted client ${entity.publicId}: ${result.getError()}`);
        }
        return result.getValue();
    }
};
exports.ClientRepository = ClientRepository;
exports.ClientRepository = ClientRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClientRepository);
//# sourceMappingURL=ClientRepository.js.map