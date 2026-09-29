import { Injectable } from "@nestjs/common";
import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

import { PasswordHasherPort } from "../../application/port/password-hasher.port";

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: string,
  keyLength: number,
) => Promise<Buffer>;

const ALGORITHM = "scrypt";
const KEY_LENGTH = 64;
const SALT_BYTES = 16;

@Injectable()
export class ScryptPasswordHasher implements PasswordHasherPort {
  async hash(plainPassword: string): Promise<string> {
    const salt = randomBytes(SALT_BYTES).toString("hex");
    const derived = await scryptAsync(plainPassword, salt, KEY_LENGTH);

    return `${ALGORITHM}$${salt}$${derived.toString("hex")}`;
  }

  async compare(plainPassword: string, hash: string): Promise<boolean> {
    const [algorithm, salt, key] = hash.split("$");
    if (algorithm !== ALGORITHM || !salt || !key) {
      return false;
    }

    const expected = Buffer.from(key, "hex");
    const derived = await scryptAsync(plainPassword, salt, expected.length);

    return (
      derived.length === expected.length && timingSafeEqual(derived, expected)
    );
  }
}
