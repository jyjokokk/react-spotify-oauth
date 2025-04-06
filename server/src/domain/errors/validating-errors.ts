export class ValidatingError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
    Error.captureStackTrace(this, this.constructor)
    Object.setPrototypeOf(this, ValidatingError.prototype)
  }
}
