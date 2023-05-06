class ApiError extends Error {
  status;
  errors;
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static unAuthorizedError() {
    return new ApiError(401, 'user is unauthorized');
  }

  static badRequestError(message, errors = []) {
    return new ApiError(400, message, errors);
  }
}

module.exports = ApiError;
