import { HttpResponse } from './http-response'

export interface Schedule {
  handle: (params?:any) => Promise<HttpResponse>
}
