export type RetryOptions = {
    maxAttempts?: number;
    baseDelayMs?: number;
    shouldRetry?: (error: unknown, attempt: number) => boolean;
};
export declare function withRetry<T>(operation: () => Promise<T>, options?: RetryOptions): Promise<T>;
