import { Result } from '../../../shared/utils/Result';

export class Phone {
  private constructor(private readonly value: string) {}

  static create(phone: string): Result<Phone> {
    const cleaned = phone.replace(/\D/g, '');

    if (cleaned.length < 10 || cleaned.length > 11) {
      return Result.fail<Phone>('Invalid phone number');
    }

    return Result.ok<Phone>(new Phone(cleaned));
  }

  getValue(): string {
    return this.value;
  }

  getFormatted(): string {
    const phone = this.value;

    if (phone.length === 11) {
      return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
    }

    return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6)}`;
  }
}
