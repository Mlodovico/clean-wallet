import { Wallet } from "../../domain/wallet/Wallet";
import { WalletRepositoryPort } from "../../domain/wallet/ports/wallet-repository.port";
export type CreateWalletInput = {
    clientId: string;
    walletType: string;
    currency: number;
    walletLimit: number;
};
export declare class CreateWalletUseCase {
    private readonly walletRepository;
    constructor(walletRepository: WalletRepositoryPort);
    execute(input: CreateWalletInput): Promise<Wallet>;
    private toPersistenceRecord;
}
