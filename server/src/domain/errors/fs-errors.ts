export class FileSystemError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'FileSystemError'
    Error.captureStackTrace(this, this.constructor)
    Object.setPrototypeOf(this, FileSystemError.prototype)
  }
}
