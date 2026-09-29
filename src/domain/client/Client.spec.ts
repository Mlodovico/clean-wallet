import {
  buildClient,
  validCreateClientInput,
  validPasswordHash,
} from "../../testing/fixtures/domain.fixtures";
import { Client } from "./Client";

const createProps = {
  name: validCreateClientInput.name,
  phone: validCreateClientInput.phone,
  email: validCreateClientInput.email,
  birthDate: validCreateClientInput.birthDate,
  document: validCreateClientInput.document,
  passwordHash: validPasswordHash,
};

describe("Client", () => {
  it("creates a valid client in pending status", () => {
    const result = Client.create(createProps);

    expect(result.isSuccess).toBe(true);
    expect(result.getValue().name.getValue()).toBe("Murilo Lodovico");
    expect(result.getValue().email.getValue()).toBe("murilo@example.com");
    expect(result.getValue().status.getValue()).toBe("pending");
  });

  it("fails when name is empty", () => {
    const result = Client.create({ ...createProps, name: "" });

    expect(result.isFailure).toBe(true);
    expect(result.getError()).toContain("Invalid name");
  });

  it("fails when email is invalid", () => {
    const result = Client.create({ ...createProps, email: "invalid-email" });

    expect(result.isFailure).toBe(true);
    expect(result.getError()).toContain("Invalid email");
  });

  it("fails when password hash is empty", () => {
    const result = Client.create({ ...createProps, passwordHash: "" });

    expect(result.isFailure).toBe(true);
    expect(result.getError()).toContain("Invalid password");
  });

  it("fails to reconstitute with an invalid status", () => {
    const result = Client.reconstitute({
      ...createProps,
      status: "unknown",
      id: "11111111-1111-4111-8111-111111111111",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    expect(result.isFailure).toBe(true);
    expect(result.getError()).toContain("Invalid status");
  });

  it("reconstitutes a client with an existing public id", () => {
    const createdAt = new Date("2026-01-01");
    const updatedAt = new Date("2026-01-02");
    const publicId = "11111111-1111-4111-8111-111111111111";

    const result = Client.reconstitute({
      ...createProps,
      status: "active",
      id: publicId,
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
      ...createProps,
      status: "active",
      id: "not-a-uuid",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    expect(result.isFailure).toBe(true);
    expect(result.getError()).toContain("Invalid client id");
  });

  describe("update", () => {
    it("updates only the provided fields", () => {
      const client = buildClient();

      const result = client.update({ name: "Jane Doe" });

      expect(result.isSuccess).toBe(true);
      expect(result.getValue().id.getValue()).toBe(client.id.getValue());
      expect(result.getValue().name.getValue()).toBe("Jane Doe");
      expect(result.getValue().email.getValue()).toBe(client.email.getValue());
      expect(result.getValue().updatedAt.getTime()).toBeGreaterThanOrEqual(
        client.updatedAt.getTime(),
      );
    });

    it("ignores status and password sent as profile changes", () => {
      const client = buildClient({ status: "pending" });

      const result = client.update({
        name: "Jane Doe",
        status: "active",
        passwordHash: "scrypt$other$hash",
      } as never);

      expect(result.getValue().status.getValue()).toBe("pending");
      expect(result.getValue().passwordHash.getValue()).toBe(validPasswordHash);
    });

    it("rejects changes on an inactive client", () => {
      const result = buildClient({ status: "inactive" }).update({
        name: "Jane Doe",
      });

      expect(result.isFailure).toBe(true);
      expect(result.getError()).toContain("inactive");
    });
  });

  describe("status transitions", () => {
    it.each([
      ["pending", "activate", "active"],
      ["suspended", "activate", "active"],
      ["active", "suspend", "suspended"],
      ["pending", "deactivate", "inactive"],
      ["active", "deactivate", "inactive"],
      ["suspended", "deactivate", "inactive"],
    ] as const)("%s --%s--> %s", (from, action, to) => {
      const result = buildClient({ status: from })[action]();

      expect(result.isSuccess).toBe(true);
      expect(result.getValue().status.getValue()).toBe(to);
    });

    it.each([
      ["active", "activate"],
      ["pending", "suspend"],
      ["suspended", "suspend"],
      ["inactive", "activate"],
      ["inactive", "suspend"],
      ["inactive", "deactivate"],
    ] as const)("rejects %s --%s-->", (from, action) => {
      const result = buildClient({ status: from })[action]();

      expect(result.isFailure).toBe(true);
      expect(result.getError()).toContain(`cannot change from ${from}`);
    });
  });

  describe("changePassword", () => {
    it("replaces the password hash", () => {
      const result = buildClient().changePassword("scrypt$new$hash");

      expect(result.getValue().passwordHash.getValue()).toBe("scrypt$new$hash");
    });

    it("rejects an inactive client", () => {
      const result = buildClient({ status: "inactive" }).changePassword(
        "scrypt$new$hash",
      );

      expect(result.isFailure).toBe(true);
    });
  });

  it("does not expose the password hash when serialized", () => {
    const json = JSON.parse(JSON.stringify(buildClient()));

    expect(json).not.toHaveProperty("passwordHash");
    expect(json.name).toEqual({ value: "Murilo Lodovico" });
  });
});
