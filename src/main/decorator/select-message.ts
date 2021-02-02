import { TELEGRAM_ENUM } from '../../presentation/helper/enum/payload.enum'
import { Controller, HttpRequest } from '../../presentation/contract'
import { makeFeedTodayController } from '../factories/controllers/feed-today/feed-factory'
import { makeScheduleController } from '../factories/controllers/schedule-confirm/create-schedule'
import { badRequest, serverError } from '@/presentation/helper'
import { ISendToTelegram } from '../../presentation/schedule'

export class MessageDecorator implements Controller {
  constructor (
    private readonly sendToTelegram:ISendToTelegram
    
  ) {}

  async handle (httpRequest:HttpRequest):Promise<any> {
    try {
      const { message } = httpRequest.body
      console.log(message)
      const messageController = {
        [TELEGRAM_ENUM.CLIENT_MESSAGE]: makeFeedTodayController().handle(httpRequest),
        [TELEGRAM_ENUM.CLIENT_CONFIRM_NOTIFY]: makeScheduleController().handle(httpRequest)
      }
      const httpResponse = await messageController[message.text]
      if (!httpResponse) {
        await this.sendToTelegram.sendToTelegram({
          payload: [TELEGRAM_ENUM.ERROR_MESSAGE],
          chatId: message.chat.id 
        })
        return badRequest(new Error('Message invalid'))
      }
      return httpResponse
    } catch (err) {
      console.log(err)
      return serverError(err)
    }
  }
}
