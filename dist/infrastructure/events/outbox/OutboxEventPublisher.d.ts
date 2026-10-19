import { DomainEvent, EventPublisherPort } from "../../../application/port/event-publisher.port";
export declare class OutboxEventPublisher implements EventPublisherPort {
    publish(event: DomainEvent): Promise<void>;
}
