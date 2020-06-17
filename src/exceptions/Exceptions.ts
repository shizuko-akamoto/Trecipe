export class UnreachableCaseException extends Error {
  constructor(val: never) {
    super(`Unreachable case: ${val}`);
  }
}
