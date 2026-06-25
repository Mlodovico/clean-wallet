import { CreateBalanceInput } from "../../application/balance/create-balance.use-case";
import { CreateClientInput } from "../../application/client/create-client.use-case";
import { CreateWalletInput } from "../../application/wallet/create-wallet.use-case";

export const validCreateClientInput: CreateClientInput = {
  name: "Murilo Lodovico",
  phone: "11999999999",
  email: "murilo@example.com",
  birthDate: new Date("1990-05-15"),
  document: "52998224725",
  password: "Password1!",
  status: "active",
};

export const validCreateBalanceInput: CreateBalanceInput = {
  amount: 150.75,
  overdraftLimit: 50,
  currency: "BRL",
  transactionType: "deposit",
  transactionId: "txn-abc-123",
  description: "Initial balance",
};

export const validCreateWalletInput: CreateWalletInput = {
  clientId: "550e8400-e29b-41d4-a716-446655440000",
  walletType: "personal",
  currency: 986,
  walletLimit: 5000,
};
