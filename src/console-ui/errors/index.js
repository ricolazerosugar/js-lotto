class ValidateError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidateError";
  }
}

export { ValidateError };
