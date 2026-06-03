export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  private _value?: T;
  private _error?: string;

  private constructor(isSuccess: boolean, value?: T, error?: string) {
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this._value = value;
    this._error = error;

    if (isSuccess && error) {
      throw new Error(
        "Invalid operation: A result cannot be successful and contain an error",
      );
    }

    if (!isSuccess && !error) {
      throw new Error(
        "Invalid operation: A failing result needs to contain an error message",
      );
    }
  }

  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error("Cannot get the value of a failed result");
    }

    return this._value!;
  }

  public getError(): string {
    if (this.isSuccess) {
      throw new Error("Cannot get the error of a successful result");
    }

    return this._error!;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, value);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, undefined, error);
  }
}
