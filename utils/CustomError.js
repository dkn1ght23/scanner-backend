class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;

    // Ensure correct prototype chain for instanceof checks
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  // You can optionally throw an error if serialize is not implemented in a subclass
  serialize() {
    throw new Error("Method 'serialize()' must be implemented by subclass");
  }
}

export { CustomError };
