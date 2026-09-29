export declare abstract class PasswordHasherPort {
    abstract hash(plainPassword: string): Promise<string>;
    abstract compare(plainPassword: string, hash: string): Promise<boolean>;
}
