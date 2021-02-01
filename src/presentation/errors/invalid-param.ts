export class InvalidParamError extends Error {
  type: String

  constructor (paramName: string) {
    super(`Invalid param: ${paramName}`)
    this.name = 'InvalidParamError'
    this.type = 'badRequest'
  }
}
