import { CustomError } from "../utils/CustomError.js";

export class ApiError extends CustomError {
  constructor(statusCode, message) {
    super(statusCode, message);
    this.statusCode = statusCode;
    this.message = message;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  serialize() {
    if (process.env.NODE_ENV === "development") {
      return [{ message: this.message, field: this.stack }];
    }
    return [{ message: this.message }];
  }
}
