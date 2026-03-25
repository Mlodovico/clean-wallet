
export class amountErrors extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'amountErrors';
    }

    static amountMustBeGreaterThanZero(): amountErrors {
        return new amountErrors('Amount must be greater than 0');
    }

    static amountMustBeFinite(): amountErrors {
        return new amountErrors('Amount must be a finite number');
    }
    
    static amountMustHaveAtMostTwoDecimals(): amountErrors {
        return new amountErrors('Amount must have at most 2 decimal places');
    }
}