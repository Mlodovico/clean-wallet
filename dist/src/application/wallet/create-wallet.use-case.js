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
exports.CreateWalletUseCase = void 0;
const common_1 = require("@nestjs/common");
const Wallet_1 = require("../../domain/wallet/Wallet");
const wallet_repository_port_1 = require("../../domain/wallet/ports/wallet-repository.port");
let CreateWalletUseCase = class CreateWalletUseCase {
    walletRepository;
    constructor(walletRepository) {
        this.walletRepository = walletRepository;
    }
    async execute(input) {
        const walletResult = Wallet_1.Wallet.create(input);
        if (walletResult.isFailure) {
            throw new common_1.BadRequestException(walletResult.getError());
        }
        const wallet = walletResult.getValue();
        try {
            await this.walletRepository.save(this.toPersistenceRecord(wallet));
        }
        catch {
            throw new common_1.InternalServerErrorException("Failed to create wallet");
        }
        return wallet;
    }
    toPersistenceRecord(wallet) {
        return {
            id: wallet.id.getValue(),
            clientId: wallet.clientId.getValue(),
            walletType: wallet.walletType.getValue(),
            currency: wallet.currency.getValue(),
            walletLimit: wallet.walletLimit.getValue(),
        };
    }
};
exports.CreateWalletUseCase = CreateWalletUseCase;
exports.CreateWalletUseCase = CreateWalletUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [wallet_repository_port_1.WalletRepositoryPort])
], CreateWalletUseCase);
//# sourceMappingURL=create-wallet.use-case.js.map