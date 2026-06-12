"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentErrors = void 0;
class DocumentErrors extends Error {
    static invalidDocumentFormat() {
        return new DocumentErrors("Invalid document format");
    }
}
exports.DocumentErrors = DocumentErrors;
//# sourceMappingURL=document.errors.js.map