import { CreateWalletInput, CreateWalletUseCase } from "../../application/wallet/create-wallet.use-case";
import { Wallet } from "../../domain/wallet/Wallet";
export declare class WalletService {
    private readonly createWalletUseCase;
    private wallets;
    constructor(createWalletUseCase: CreateWalletUseCase);
    findAll(): Wallet[];
    create(walletData: CreateWalletInput): Promise<Wallet>;
}
