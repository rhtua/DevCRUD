export class ErroBase extends Error {
  statusCode: number;

  constructor(description: string, statusCode: number) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}
