import { EventPublisherPort } from "../../application/port/event-publisher.port";
import { PasswordHasherPort } from "../../application/port/password-hasher.port";
import { UnitOfWorkPort } from "../../application/port/unit-of-work.port";
import { ClientRepositoryPort } from "../../domain/client/ports/client-repository.port";

export const mockClientRepository = (): jest.Mocked<ClientRepositoryPort> => ({
  save: jest.fn(),
  update: jest.fn(),
  findById: jest.fn().mockResolvedValue(null),
  findByDocument: jest.fn().mockResolvedValue(null),
  findByEmail: jest.fn().mockResolvedValue(null),
});

export const mockPasswordHasher = (): jest.Mocked<PasswordHasherPort> => ({
  hash: jest.fn((plain: string) =>
    Promise.resolve(`scrypt$salt$${plain.length}`),
  ),
  compare: jest.fn().mockResolvedValue(true),
});

export const mockEventPublisher = (): jest.Mocked<EventPublisherPort> => ({
  publish: jest.fn().mockResolvedValue(undefined),
});

export const mockUnitOfWork = (): jest.Mocked<UnitOfWorkPort> =>
  ({
    run: jest.fn((work: () => Promise<unknown>) => work()),
  }) as unknown as jest.Mocked<UnitOfWorkPort>;
