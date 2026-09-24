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

  it("reconstitutes a client with an existing public id", () => {
    const createdAt = new Date("2026-01-01");
    const updatedAt = new Date("2026-01-02");
    const publicId = "11111111-1111-4111-8111-111111111111";

    const result = Client.reconstitute({
      ...validCreateClientInput,
      id: publicId,
      birthDate: validCreateClientInput.birthDate as Date,
      createdAt,
      updatedAt,
    });

    expect(result.isSuccess).toBe(true);
    expect(result.getValue().id.getValue()).toBe(publicId);
    expect(result.getValue().createdAt).toBe(createdAt);
    expect(result.getValue().updatedAt).toBe(updatedAt);
  });

  it("fails to reconstitute when the public id is not a uuid", () => {
    const result = Client.reconstitute({
      ...validCreateClientInput,
      id: "not-a-uuid",
      birthDate: validCreateClientInput.birthDate as Date,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    expect(result.isFailure).toBe(true);
    expect(result.getError()).toContain("Invalid client id");
  });

  it("updates only the provided fields", () => {
    const client = Client.create({
      ...validCreateClientInput,
      birthDate: validCreateClientInput.birthDate as Date,
    }).getValue();

    const result = client.update({ name: "Jane Doe" });

    expect(result.isSuccess).toBe(true);
    expect(result.getValue().id.getValue()).toBe(client.id.getValue());
    expect(result.getValue().name.getValue()).toBe("Jane Doe");
    expect(result.getValue().email.getValue()).toBe(client.email.getValue());
    expect(result.getValue().updatedAt.getTime()).toBeGreaterThanOrEqual(
      client.updatedAt.getTime(),
    );
  });
});
