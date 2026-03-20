class ApiError extends Error {
  constructor(statusCode, message, controller = null, details = null) {
    super(message);

    this.statusCode = statusCode;
    this.controller = controller;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;