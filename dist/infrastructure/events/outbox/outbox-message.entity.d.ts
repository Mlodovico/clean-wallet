export declare class OutboxMessage {
    id: string;
    type: string;
    payload: Record<string, unknown>;
    publishedAt: Date | null;
    occurredAt: Date;
    attempts: number;
    lastError: string | null;
}
