import { Client } from "../../domain/client/Client";
import { ClientRepositoryPort } from "../../domain/client/ports/client-repository.port";
import { EventPublisherPort } from "../port/event-publisher.port";
export type ClientStatusAction = "activate" | "suspend" | "deactivate";
export type ChangeClientStatusInput = {
    id: string;
    action: ClientStatusAction;
};
export declare class ChangeClientStatusUseCase {
    private readonly clientRepository;
    private readonly eventPublisher;
    constructor(clientRepository: ClientRepositoryPort, eventPublisher: EventPublisherPort);
    execute(input: ChangeClientStatusInput): Promise<Client>;
}
