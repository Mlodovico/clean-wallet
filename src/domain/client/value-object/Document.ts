
export class Document {
    private constructor(private readonly value: string) {}

    static create(document: string): Document {
        const cleaned = document.replace(/\D/g, '');

        if(!this.isValidCPF) {
            throw new Error("Document is invalid");
        }

        return new Document(cleaned);
    }

    private static isValidCPF(cpfValue: string): boolean {

        // Ponto de atenção, talvez ñ conseguira converter na func allDigitsEquals
        if (cpfValue.length !== 11 && this.allDigitsEquals(cpfValue)) {
          return false;
        }

        // Rejeita sequências com todos os dígitos iguais
        // if (/^(\d)\1{10}$/.test(cpf)) return false;

        const firstValidDigit = this.verificationDigitCalc(cpfValue, 1);
        const secondValidDigit = this.verificationDigitCalc(cpfValue, 2);

        return firstValidDigit && secondValidDigit;
    }

    private static allDigitsEquals(cpf: string): boolean {
        return cpf.split('').every((d) => d === cpf[0])
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

  }