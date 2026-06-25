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
exports.CreateBalanceUseCase = void 0;
const common_1 = require("@nestjs/common");
const Balance_1 = require("../../domain/balance/Balance");
const balance_repository_port_1 = require("../../domain/balance/ports/balance-repository.port");
let CreateBalanceUseCase = class CreateBalanceUseCase {
    balanceRepository;
    constructor(balanceRepository) {
        this.balanceRepository = balanceRepository;
    }
    async execute(input) {
        const balanceResult = Balance_1.Balance.create(input);
        if (balanceResult.isFailure) {
            throw new common_1.BadRequestException(balanceResult.getError());
        }
        const balance = balanceResult.getValue();
        try {
            await this.balanceRepository.save(this.toPersistenceRecord(balance));
        }
        catch {
            throw new common_1.InternalServerErrorException("Failed to create balance");
        }
        return balance;
    }
    toPersistenceRecord(balance) {
        return {
            id: balance.id.getValue(),
            amount: balance.amount.getValue(),
            overdraftLimit: balance.overdraftLimit.getValue(),
            currency: balance.currency.getValue(),
            transactionType: balance.transactionType.getValue(),
            transactionId: balance.transactionId.getValue(),
            description: balance.description.getValue(),
        };
    }
};
exports.CreateBalanceUseCase = CreateBalanceUseCase;
exports.CreateBalanceUseCase = CreateBalanceUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [balance_repository_port_1.BalanceRepositoryPort])
], CreateBalanceUseCase);
//# sourceMappingURL=create-balance.use-case.js.map