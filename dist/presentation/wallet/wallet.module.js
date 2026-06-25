"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const create_wallet_use_case_1 = require("../../application/wallet/create-wallet.use-case");
const wallet_entity_1 = require("../../domain/wallet/wallet.entity");
const wallet_repository_port_1 = require("../../domain/wallet/ports/wallet-repository.port");
const WalletRepository_1 = require("../../infrastructure/repositories/WalletRepository");
const wallet_controller_1 = require("./wallet.controller");
const wallet_service_1 = require("./wallet.service");
let WalletModule = class WalletModule {
};
exports.WalletModule = WalletModule;
exports.WalletModule = WalletModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([wallet_entity_1.WalletEntity])],
        controllers: [wallet_controller_1.WalletController],
        providers: [
            wallet_service_1.WalletService,
            create_wallet_use_case_1.CreateWalletUseCase,
            {
                provide: wallet_repository_port_1.WalletRepositoryPort,
                useClass: WalletRepository_1.WalletRepository,
            },
        ],
        exports: [wallet_service_1.WalletService, create_wallet_use_case_1.CreateWalletUseCase],
    })
], WalletModule);
//# sourceMappingURL=wallet.module.js.map