export type BrokerMessage = {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  occurredAt: Date;
};

export abstract class MessageBrokerPort {
  abstract publish(message: BrokerMessage): Promise<void>;
}
