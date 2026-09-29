import { ClientRepositoryPort } from "../../domain/client/ports/client-repository.port";
import { EventPublisherPort } from "../port/event-publisher.port";
import { PasswordHasherPort } from "../port/password-hasher.port";
export type ChangeClientPasswordInput = {
    id: string;
    currentPassword: string;
    newPassword: string;
};
export declare class ChangeClientPasswordUseCase {
    private readonly clientRepository;
    private readonly passwordHasher;
    private readonly eventPublisher;
    constructor(clientRepository: ClientRepositoryPort, passwordHasher: PasswordHasherPort, eventPublisher: EventPublisherPort);
    execute(input: ChangeClientPasswordInput): Promise<void>;
}
