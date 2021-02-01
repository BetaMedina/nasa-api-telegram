import { HttpResponse } from '@/presentation/contract'
import { HttpRequest } from './'

export interface Controller {
  handle: (httpRequest?:HttpRequest) => Promise<HttpResponse>
}
