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
exports.BalanceRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const balance_entity_1 = require("../../domain/balance/balance.entity");
let BalanceRepository = class BalanceRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async save(record) {
        const saved = await this.repository.save(record);
        return {
            id: saved.id,
            amount: Number(saved.amount),
            overdraftLimit: Number(saved.overdraftLimit),
            currency: saved.currency,
            transactionType: saved.transactionType,
            transactionId: saved.transactionId,
            description: saved.description,
            createdAt: saved.createdAt,
            updatedAt: saved.updatedAt,
        };
    }
};
exports.BalanceRepository = BalanceRepository;
exports.BalanceRepository = BalanceRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(balance_entity_1.BalanceEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BalanceRepository);
//# sourceMappingURL=BalanceRepository.js.map