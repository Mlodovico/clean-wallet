import { validCreateClientInput } from "../../testing/fixtures/domain.fixtures";
import { Client } from "./Client";

describe("Client", () => {
  it("creates a valid client", () => {
    const result = Client.create({
      ...validCreateClientInput,
      birthDate: validCreateClientInput.birthDate as Date,
    });

    expect(result.isSuccess).toBe(true);
    expect(result.getValue().name.getValue()).toBe("Murilo Lodovico");
    expect(result.getValue().email.getValue()).toBe("murilo@example.com");
    expect(result.getValue().status.getValue()).toBe("active");
  });

  it("fails when name is empty", () => {
    const result = Client.create({
      ...validCreateClientInput,
      name: "",
      birthDate: validCreateClientInput.birthDate as Date,
    });

    expect(result.isFailure).toBe(true);
    expect(result.getError()).toContain("Invalid name");
  });

  it("fails when email is invalid", () => {
    const result = Client.create({
      ...validCreateClientInput,
      email: "invalid-email",
      birthDate: validCreateClientInput.birthDate as Date,
    });

    expect(result.isFailure).toBe(true);
    expect(result.getError()).toContain("Invalid email");
  });

  it("fails when status is invalid", () => {
    const result = Client.create({
      ...validCreateClientInput,
      status: "unknown",
      birthDate: validCreateClientInput.birthDate as Date,
    });

    expect(result.isFailure).toBe(true);
    expect(result.getError()).toContain("Invalid status");
  });
});
