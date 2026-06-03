import { Result } from "../../../shared/utils/Result";

export class Status {
  private static readonly ALLOWED_STATUSES = new Set([
    "active",
    "inactive",
    "suspended",
    "pending",
  ]);

  private constructor(private readonly value: string) {}

  static create(status: string): Result<Status> {
    const normalizedStatus = status.trim().toLowerCase();

    if (!normalizedStatus) {
      return Result.fail<Status>("Status cannot be empty");
    }

    if (normalizedStatus.length > 20) {
      return Result.fail<Status>("Status cannot be longer than 20 characters");
    }

    if (!this.ALLOWED_STATUSES.has(normalizedStatus)) {
      return Result.fail<Status>(
        `Invalid status: ${status}. Allowed values are: ${Array.from(
          this.ALLOWED_STATUSES,
        ).join(", ")}`,
      );
    }

    return Result.ok<Status>(new Status(normalizedStatus));
  }

  get asString(): string {
    return this.value;
  }

  getValue(): string {
    return this.value;
  }
}
