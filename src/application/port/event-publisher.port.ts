export type DomainEventType =
  | "client.created"
  | "client.activated"
  | "client.suspended"
  | "client.deactivated"
  | "client.password_changed"
  | "wallet.opened";

export type DomainEvent<
  TType extends DomainEventType = DomainEventType,
  TPayload extends Record<string, unknown> = Record<string, unknown>,
> = {
  id?: string;
  type: TType;
  payload: TPayload;
  occurredAt: Date;
};

export abstract class EventPublisherPort {
  abstract publish(event: DomainEvent): Promise<void>;
}
