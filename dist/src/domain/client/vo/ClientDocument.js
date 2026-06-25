"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientDocument = void 0;
const Result_1 = require("src/shared/utils/Result");
const document_errors_1 = require("../errors/document.errors");
class ClientDocument {
    value;
    constructor(value) {
        this.value = value;
    }
    static create(document) {
        const cleaned = document.replace(/\D/g, "");
        if (!this.isValidCPF) {
            return Result_1.Result.fail(document_errors_1.DocumentErrors.invalidDocumentFormat().message);
        }
        return Result_1.Result.ok(new ClientDocument(cleaned));
    }
    static isValidCPF(cpfValue) {
        if (cpfValue.length !== 11 && this.allDigitsEquals(cpfValue)) {
            return false;
        }
        const firstValidDigit = this.verificationDigitCalc(cpfValue, 1);
        const secondValidDigit = this.verificationDigitCalc(cpfValue, 2);
        return firstValidDigit && secondValidDigit;
    }
    static allDigitsEquals(cpf) {
        return cpf.split("").every((d) => d === cpf[0]);
    }
    static verificationDigitCalc(cpf, digit) {
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
        }
        else if (digit === 2) {
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
    getValue() {
        return this.value;
    }
}
exports.ClientDocument = ClientDocument;
//# sourceMappingURL=ClientDocument.js.map