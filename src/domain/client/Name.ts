type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

export class Name {
  private constructor(readonly value: string) {}

  static create(name: string): Result<Name> {
    if (!name || name.trim().length === 0) {
      return { ok: false, error: new Error('Name cannot be empty') };
    }

    if (name.length > 100) {
      return {
        ok: false,
        error: new Error('Name cannot exceed 100 characters'),
      };
    }

    return { ok: true, value: new Name(name.trim()) };
  }
}
