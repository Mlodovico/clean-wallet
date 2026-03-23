
export class Phone {
    private constructor(private readonly value: string) {}

    static create(phone: string): Phone {
        const cleaned = phone.replace(/\D/g, '');

        if(cleaned.length < 10 || cleaned.length > 11) {
            throw new Error('Invalid phone number');
        }

        return new Phone(cleaned);
    }

    getValue(): string {
        return this.value;
    }

    getFormatted(): string {
        const phone = this.value;

        if(phone.length === 11) {
            return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
        }

        return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6)}`; 
    }
}