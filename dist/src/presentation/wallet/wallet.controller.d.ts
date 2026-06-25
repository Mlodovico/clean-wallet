import { CreateWalletInput } from "../../application/wallet/create-wallet.use-case";
import { Wallet } from "../../domain/wallet/Wallet";
import { WalletService } from "./wallet.service";
export declare class WalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
    findAll(): Wallet[];
    create(createWalletDto: CreateWalletInput): Promise<Wallet>;
}
