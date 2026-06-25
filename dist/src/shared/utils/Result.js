"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
class Result {
    isSuccess;
    isFailure;
    _value;
    _error;
    constructor(isSuccess, value, error) {
        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this._value = value;
        this._error = error;
        if (isSuccess && error) {
            throw new Error("Invalid operation: A result cannot be successful and contain an error");
        }
        if (!isSuccess && !error) {
            throw new Error("Invalid operation: A failing result needs to contain an error message");
        }
    }
    getValue() {
        if (!this.isSuccess) {
            throw new Error("Cannot get the value of a failed result");
        }
        return this._value;
    }
    getError() {
        if (this.isSuccess) {
            throw new Error("Cannot get the error of a successful result");
        }
        return this._error;
    }
    static ok(value) {
        return new Result(true, value);
    }
    static fail(error) {
        return new Result(false, undefined, error);
    }
}
exports.Result = Result;
//# sourceMappingURL=Result.js.map