const TRANSIENT_PG_ERROR_CODES = new Set([
  "40001", // serialization_failure
  "40P01", // deadlock_detected
  "53300", // too_many_connections
  "57P01", // admin_shutdown
  "57P02", // crash_shutdown
  "57P03", // cannot_connect_now
  "08000", // connection_exception
  "08003", // connection_does_not_exist
  "08006", // connection_failure
  "08001", // sqlclient_unable_to_establish_sqlconnection
  "08004", // sqlserver_rejected_establishment_of_sqlconnection
]);

const TRANSIENT_SYSTEM_ERROR_CODES = new Set([
  "ECONNREFUSED",
  "ECONNRESET",
  "ETIMEDOUT",
  "EPIPE",
  "ENOTFOUND",
]);

export function isTransientError(error: unknown): boolean {
  if (!error || typeof error !== "object") {
    return false;
  }

  const candidate = error as {
    code?: string;
    errno?: string;
    message?: string;
  };

  if (
    candidate.code &&
    (TRANSIENT_PG_ERROR_CODES.has(candidate.code) ||
      TRANSIENT_SYSTEM_ERROR_CODES.has(candidate.code))
  ) {
    return true;
  }

  if (candidate.message) {
    const message = candidate.message.toLowerCase();
    return (
      message.includes("connection terminated") ||
      message.includes("connection refused") ||
      message.includes("timeout") ||
      message.includes("too many connections")
    );
  }

  return false;
}
