import { randomUUID } from "crypto";

export abstract class UniqueEntityId {
    protected readonly value: string;

    protected constructor(value?: string) {
        this.value = value || randomUUID();
    }

    equals(id: UniqueEntityId): boolean {
        return this.value === id.value;
    }

    toString(): string {
        return this.value;
    }
}