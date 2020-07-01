export class UnreachableCaseException extends Error {
    constructor(val: never) {
        super(`Unreachable case: ${val}`);
    }
}

export class TrecipeException extends Error {}
