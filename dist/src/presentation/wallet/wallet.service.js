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
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const create_wallet_use_case_1 = require("../../application/wallet/create-wallet.use-case");
let WalletService = class WalletService {
    createWalletUseCase;
    wallets = [];
    constructor(createWalletUseCase) {
        this.createWalletUseCase = createWalletUseCase;
    }
    findAll() {
        return this.wallets;
    }
    async create(walletData) {
        const newWallet = await this.createWalletUseCase.execute(walletData);
        this.wallets.push(newWallet);
        return newWallet;
    }
};
exports.WalletService = WalletService;
exports.WalletService = WalletService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [create_wallet_use_case_1.CreateWalletUseCase])
], WalletService);
//# sourceMappingURL=wallet.service.js.map