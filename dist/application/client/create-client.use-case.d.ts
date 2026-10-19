import { Client } from "../../domain/client/Client";
import { ClientRepositoryPort } from "../../domain/client/ports/client-repository.port";
import { EventPublisherPort } from "../port/event-publisher.port";
import { PasswordHasherPort } from "../port/password-hasher.port";
import { UnitOfWorkPort } from "../port/unit-of-work.port";
export type CreateClientInput = {
    name: string;
    phone: string;
    email: string;
    birthDate: Date | string;
    document: string;
    password: string;
};
export declare class CreateClientUseCase {
    private readonly clientRepository;
    private readonly passwordHasher;
    private readonly eventPublisher;
    private readonly unitOfWork;
    constructor(clientRepository: ClientRepositoryPort, passwordHasher: PasswordHasherPort, eventPublisher: EventPublisherPort, unitOfWork: UnitOfWorkPort);
    execute(input: CreateClientInput): Promise<Client>;
}
