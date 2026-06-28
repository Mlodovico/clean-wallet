import { isTransientError } from "./is-transient-error";
import { withRetry } from "./retry";

describe("isTransientError", () => {
  it("detects postgres transient error codes", () => {
    expect(isTransientError({ code: "40P01" })).toBe(true);
    expect(isTransientError({ code: "57P01" })).toBe(true);
  });

  it("detects network transient error codes", () => {
    expect(isTransientError({ code: "ECONNREFUSED" })).toBe(true);
    expect(isTransientError({ code: "ETIMEDOUT" })).toBe(true);
  });

  it("returns false for business errors", () => {
    expect(isTransientError({ code: "23505" })).toBe(false);
    expect(isTransientError(new Error("duplicate key"))).toBe(false);
  });
});

describe("withRetry", () => {
  it("returns the result when the operation succeeds", async () => {
    const result = await withRetry(() => Promise.resolve("ok"));

    expect(result).toBe("ok");
  });

  it("retries transient failures and eventually succeeds", async () => {
    let attempts = 0;

    const result = await withRetry(
      () => {
        attempts += 1;
        if (attempts < 3) {
          return Promise.reject(
            Object.assign(new Error("ECONNREFUSED"), { code: "ECONNREFUSED" }),
          );
        }
        return Promise.resolve("recovered");
      },
      { baseDelayMs: 1 },
    );

    expect(result).toBe("recovered");
    expect(attempts).toBe(3);
  });

  it("stops retrying when the error is not transient", async () => {
    let attempts = 0;

    await expect(
      withRetry(
        () => {
          attempts += 1;
          return Promise.reject(new Error("validation failed"));
        },
        { baseDelayMs: 1 },
      ),
    ).rejects.toThrow("validation failed");

    expect(attempts).toBe(1);
  });
});
