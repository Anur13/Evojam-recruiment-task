class BaseError extends Error {
  public statusCode: number;
  public description: string;

  constructor(name: string, statusCode: number, description: string) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.description = description;
    Error.captureStackTrace(this);
  }
}

class APIError extends BaseError {
  constructor(name: string, httpCode: number, description: string) {
    super(name, httpCode, description);
  }
}
export default APIError;
