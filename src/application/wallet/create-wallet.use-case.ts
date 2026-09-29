import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

import { StatusErrors } from "../../domain/client/errors/status.errors";
import { ClientRepositoryPort } from "../../domain/client/ports/client-repository.port";
import { Wallet } from "../../domain/wallet/Wallet";
import {
  WalletPersistenceRecord,
  WalletRepositoryPort,
} from "../../domain/wallet/ports/wallet-repository.port";

export type CreateWalletInput = {
  clientId: string;
  walletType: string;
  currency: number;
  walletLimit: number;
};

@Injectable()
export class CreateWalletUseCase {
  constructor(
    private readonly walletRepository: WalletRepositoryPort,
    private readonly clientRepository: ClientRepositoryPort,
  ) {}

  async execute(input: CreateWalletInput): Promise<Wallet> {
    const walletResult = Wallet.create(input);

    if (walletResult.isFailure) {
      throw new BadRequestException(walletResult.getError());
    }

    const wallet = walletResult.getValue();

    const client = await this.clientRepository.findById(
      wallet.clientId.getValue(),
    );
    if (!client) {
      throw new NotFoundException("Client not found");
    }

    if (!client.isActive) {
      throw new ConflictException(StatusErrors.clientIsNotActive().message);
    }

    try {
      await this.walletRepository.save(this.toPersistenceRecord(wallet));
    } catch {
      throw new InternalServerErrorException("Failed to create wallet");
    }

    return wallet;
  }

  private toPersistenceRecord(wallet: Wallet): WalletPersistenceRecord {
    return {
      id: wallet.id.getValue(),
      clientId: wallet.clientId.getValue(),
      walletType: wallet.walletType.getValue(),
      currency: wallet.currency.getValue(),
      walletLimit: wallet.walletLimit.getValue(),
    };
  }
}
