export class ServerError extends Error {
  type: String
  constructor (stack: string) {
    super('Internal server error')
    this.name = 'ServerError'
    this.stack = stack
    this.type = 'serverError'
  }
}
