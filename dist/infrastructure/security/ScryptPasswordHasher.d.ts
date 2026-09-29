import { PasswordHasherPort } from "../../application/port/password-hasher.port";
export declare class ScryptPasswordHasher implements PasswordHasherPort {
    hash(plainPassword: string): Promise<string>;
    compare(plainPassword: string, hash: string): Promise<boolean>;
}
