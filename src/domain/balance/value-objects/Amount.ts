
export class Amount {
    private constructor(private readonly value: number) {}

    static create(amount: number): Amount {
        if (amount <= 0) {
            throw new Error('Amount must be greater than 0');
        }

        return new Amount(amount);
    }

    getValue(): number {
        return this.value;
    }
}