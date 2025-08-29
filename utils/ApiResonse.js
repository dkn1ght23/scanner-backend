export class ApiResponse {
  constructor(statusCode, message, data = {}) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }

  send(res) {
    return res.status(this.statusCode).json({
      message: this.message,
      data: this.data,
      success: this.success,
    });
  }
}
