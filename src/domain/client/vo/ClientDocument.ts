import { Result } from 'src/shared/utils/Result';
import { DocumentErrors } from '../errors/document.errors';

export class ClientDocument {
  private constructor(private readonly value: string) {}

  static create(document: string): Result<ClientDocument> {
    const cleaned = document.replace(/\D/g, '');

    if (!this.isValidCPF) {
      return Result.fail<ClientDocument>(
        DocumentErrors.invalidDocumentFormat().message,
      );
    }

    return Result.ok(new ClientDocument(cleaned));
  }

  private static isValidCPF(cpfValue: string): boolean {
    if (cpfValue.length !== 11 && this.allDigitsEquals(cpfValue)) {
      return false;
    }
    const firstValidDigit = this.verificationDigitCalc(cpfValue, 1);
    const secondValidDigit = this.verificationDigitCalc(cpfValue, 2);

    return firstValidDigit && secondValidDigit;
  }

  private static allDigitsEquals(cpf: string): boolean {
    return cpf.split('').every((d) => d === cpf[0]);
  }

  private static verificationDigitCalc(cpf: string, digit: number): boolean {
    if (digit === 1) {
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf[i], 10) * (10 - i);
      }
      let firstVerifier = (sum * 10) % 11;
      if (firstVerifier === 10 || firstVerifier === 11) {
        firstVerifier = 0;
      }
      return firstVerifier === parseInt(cpf[9], 10);
    } else if (digit === 2) {
      let sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf[i], 10) * (11 - i);
      }
      let secondVerifier = (sum * 10) % 11;
      if (secondVerifier === 10 || secondVerifier === 11) {
        secondVerifier = 0;
      }
      return secondVerifier === parseInt(cpf[10], 10);
    }
    return false;
  }

  getValue(): string {
    return this.value;
  }
}
