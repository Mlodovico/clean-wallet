import { DomainEvent, EventPublisherPort } from "../../application/port/event-publisher.port";
export declare class LoggerEventPublisher implements EventPublisherPort {
    private readonly logger;
    publish(event: DomainEvent): Promise<void>;
}
