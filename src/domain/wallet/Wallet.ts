import { Result } from 'src/shared/utils/Result';

type RawWalletProps = {
  id: string;
  clientId: string;
  walletType: string;
  currency: number;
  walletLimit: number;
};

export class Wallet {
  constructor(
    public readonly id: string,
    public readonly clientId: string,
    public readonly walletType: string,
    public readonly currency: number,
    public readonly walletLimit: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(props: RawWalletProps): Result<Wallet> {
    // Implementar validações e criação de objetos de valor aqui
    // Exemplo:
    // const walletTypeResult = WalletType.create(props.walletType);
    // if (walletTypeResult.isFailure) {
    //     return Result.fail<Wallet>(`Invalid wallet type: ${walletTypeResult.getError()}`);
    // }

    // Se todas as validações passarem, criar a carteira
    const newWallet = new Wallet(
      props.id,
      props.clientId,
      props.walletType,
      props.currency,
      props.walletLimit,
      new Date(),
      new Date(),
    );

    return Result.ok<Wallet>(newWallet);
  }
}
