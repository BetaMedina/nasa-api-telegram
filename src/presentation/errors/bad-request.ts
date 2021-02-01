export class BadRequestError extends Error {
  type: String

  constructor (error: string) {
    super(`Error: ${error}`)
    this.name = 'BadRequestError'
    this.type = 'badRequest'
  }
}
