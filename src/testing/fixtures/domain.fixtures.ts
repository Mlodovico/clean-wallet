import { CreateBalanceInput } from "../../application/balance/create-balance.use-case";
import { CreateClientInput } from "../../application/client/create-client.use-case";
import { CreateWalletInput } from "../../application/wallet/create-wallet.use-case";
import { Client, ClientStatusValue } from "../../domain/client/Client";

export const CLIENT_PUBLIC_ID = "550e8400-e29b-41d4-a716-446655440000";

export const validCreateClientInput: CreateClientInput = {
  name: "Murilo Lodovico",
  phone: "11999999999",
  email: "murilo@example.com",
  birthDate: new Date("1990-05-15"),
  document: "52998224725",
  password: "Password1!",
};

export const validPasswordHash = "scrypt$73616c74$6b6579";

export const anotherValidDocument = "11144477735";

type BuildClientOverrides = {
  id?: string;
  document?: string;
  email?: string;
  status?: ClientStatusValue;
  passwordHash?: string;
};

export const buildClient = (overrides: BuildClientOverrides = {}): Client =>
  Client.reconstitute({
    name: validCreateClientInput.name,
    phone: validCreateClientInput.phone,
    email: validCreateClientInput.email,
    birthDate: validCreateClientInput.birthDate,
    document: validCreateClientInput.document,
    passwordHash: validPasswordHash,
    status: "active",
    id: CLIENT_PUBLIC_ID,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
    ...overrides,
  }).getValue();

export const validCreateBalanceInput: CreateBalanceInput = {
  amount: 150.75,
  overdraftLimit: 50,
  currency: "BRL",
  transactionType: "deposit",
  transactionId: "txn-abc-123",
  description: "Initial balance",
};

export const validCreateWalletInput: CreateWalletInput = {
  clientId: CLIENT_PUBLIC_ID,
  walletType: "personal",
  currency: 986,
  walletLimit: 5000,
};
