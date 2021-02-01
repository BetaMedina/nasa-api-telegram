import { HttpResponse } from '../contract'

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  data: error.message
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  data: error.message
})

export const success = (data: any): HttpResponse => ({
  statusCode: 200,
  data
})  

export const empty = (): HttpResponse => ({
  statusCode: 204,
  data: 'EmptyResponse'
})  
