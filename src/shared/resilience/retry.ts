import { isTransientError } from "./is-transient-error";

export type RetryOptions = {
  maxAttempts?: number;
  baseDelayMs?: number;
  shouldRetry?: (error: unknown, attempt: number) => boolean;
};

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const maxAttempts = options.maxAttempts ?? 3;
  const baseDelayMs = options.baseDelayMs ?? 200;
  const shouldRetry = options.shouldRetry ?? isTransientError;

  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (attempt === maxAttempts || !shouldRetry(error, attempt)) {
        throw error;
      }

      await sleep(baseDelayMs * attempt);
    }
  }

  throw lastError;
}
