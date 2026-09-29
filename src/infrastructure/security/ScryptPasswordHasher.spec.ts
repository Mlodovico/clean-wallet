import { ScryptPasswordHasher } from "./ScryptPasswordHasher";

describe("ScryptPasswordHasher", () => {
  const hasher = new ScryptPasswordHasher();

  it("produces a salted hash that verifies only the original password", async () => {
    const hash = await hasher.hash("Password1!");

    expect(hash).toMatch(/^scrypt\$[0-9a-f]{32}\$[0-9a-f]{128}$/);
    expect(hash).not.toContain("Password1!");
    await expect(hasher.compare("Password1!", hash)).resolves.toBe(true);
    await expect(hasher.compare("Password2!", hash)).resolves.toBe(false);
  });

  it("generates a different hash for the same password", async () => {
    const [first, second] = await Promise.all([
      hasher.hash("Password1!"),
      hasher.hash("Password1!"),
    ]);

    expect(first).not.toBe(second);
  });

  it("rejects hashes in an unknown format, such as legacy plain text", async () => {
    await expect(hasher.compare("Password1!", "Password1!")).resolves.toBe(
      false,
    );
  });
});
