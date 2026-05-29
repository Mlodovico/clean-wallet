import { Result } from 'src/shared/utils/Result';
import { WalletId } from './vo/WalletId';
import { WalletType } from './vo/walletTypes';
import { Currency } from './vo/currency';
import { WalletLimit } from './vo/walletLimit';
type RawWalletProps = {
    id: string;
    clientId: string;
    walletType: string;
    currency: number;
    walletLimit: number;
};
export declare class Wallet {
    readonly id: WalletId;
    readonly clientId: string;
    readonly walletType: WalletType;
    readonly currency: Currency;
    readonly walletLimit: WalletLimit;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(id: WalletId, clientId: string, walletType: WalletType, currency: Currency, walletLimit: WalletLimit, createdAt: Date, updatedAt: Date);
    static create(props: RawWalletProps): Result<Wallet>;
}
export {};
