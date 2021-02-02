import { Request, Response } from 'express'
import { Controller, HttpRequest } from '../../presentation/contract'

export const adaptRoute = (controller:any) => {
  return async (req:Request, res:Response) => {
    const httpRequest:HttpRequest = {
      body: req.body,
      params: req.params,
      headers: req.headers
    }
    const httpResponse = await controller.handle(httpRequest)
    console.log(httpResponse)
    if (httpResponse.statusCode === 200) {
      return res.status(httpResponse.statusCode).json(httpResponse.data)
    }
    return res.status(httpResponse.statusCode).json({ error: httpResponse.data })
  }
}
