"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const create_balance_use_case_1 = require("../../application/balance/create-balance.use-case");
const balance_entity_1 = require("../../domain/balance/balance.entity");
const balance_repository_port_1 = require("../../domain/balance/ports/balance-repository.port");
const BalanceRepository_1 = require("../../infrastructure/repositories/BalanceRepository");
const balance_controller_1 = require("./balance.controller");
const balance_service_1 = require("./balance.service");
let BalanceModule = class BalanceModule {
};
exports.BalanceModule = BalanceModule;
exports.BalanceModule = BalanceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([balance_entity_1.BalanceEntity])],
        controllers: [balance_controller_1.BalanceController],
        providers: [
            balance_service_1.BalanceService,
            create_balance_use_case_1.CreateBalanceUseCase,
            {
                provide: balance_repository_port_1.BalanceRepositoryPort,
                useClass: BalanceRepository_1.BalanceRepository,
            },
        ],
        exports: [balance_service_1.BalanceService, create_balance_use_case_1.CreateBalanceUseCase],
    })
], BalanceModule);
//# sourceMappingURL=balance.module.js.map