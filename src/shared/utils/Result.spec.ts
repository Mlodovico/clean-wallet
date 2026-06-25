import { Result } from "./Result";

describe("Result", () => {
  it("creates a successful result", () => {
    const result = Result.ok("value");

    expect(result.isSuccess).toBe(true);
    expect(result.isFailure).toBe(false);
    expect(result.getValue()).toBe("value");
  });

  it("creates a failed result", () => {
    const result = Result.fail<string>("error message");

    expect(result.isSuccess).toBe(false);
    expect(result.isFailure).toBe(true);
    expect(result.getError()).toBe("error message");
  });

  it("throws when reading value from failed result", () => {
    const result = Result.fail<string>("error");

    expect(() => result.getValue()).toThrow(
      "Cannot get the value of a failed result",
    );
  });

  it("throws when reading error from successful result", () => {
    const result = Result.ok("value");

    expect(() => result.getError()).toThrow(
      "Cannot get the error of a successful result",
    );
  });
});
