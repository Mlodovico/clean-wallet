type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

export class Status {
  private static readonly ALLOWED_STATUSES = new Set([
    'active',
    'inactive',
    'suspended',
    'pending',
  ]);

  private constructor(private readonly value: string) {}

  static create(status: string): Result<Status> {
    const normalizedStatus = status.trim().toLowerCase();

    if (!normalizedStatus) {
      return { ok: false, error: new Error('Status cannot be empty') };
    }

    if (normalizedStatus.length > 20) {
      return {
        ok: false,
        error: new Error('Status cannot exceed 20 characters'),
      };
    }

    if (!this.ALLOWED_STATUSES.has(normalizedStatus)) {
      return {
        ok: false,
        error: new Error(
          `Invalid status. Allowed statuses are: ${Array.from(
            this.ALLOWED_STATUSES,
          ).join(', ')}`,
        ),
      };
    }

    return { ok: true, value: new Status(normalizedStatus) };
  }

  get asString(): string {
    return this.value;
  }
}
