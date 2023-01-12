export class CustomError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

export class ValidationError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

export class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

export class RegistrationConflictError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

export class NotAuthorizeError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}
