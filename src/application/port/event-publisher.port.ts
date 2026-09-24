export type DomainEventType = "client.created" | "wallet.opened";

export type DomainEvent<TType extends DomainEventType = DomainEventType, 
TPayload extends Record<string, unknown> = Record<string, unknown>,
> = {
  type: TType;
  payload: TPayload;
  occurredAt: Date;
};