
import { TELEGRAM_ENUM } from '../../presentation/controller/nasa/feed-today/enum/payload.enum'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/contract'
import { ISendToTelegram } from '../../domain/use-cases/send-telegram-api'
import { success } from '../../presentation/helper'

export class TelegramMessageDecorator implements Controller {
  constructor (
    private readonly controller:Controller, 
    private readonly sendToTelegram:ISendToTelegram
    
  ) {}

  async handle (httpRequest:HttpRequest):Promise<HttpResponse> {
    const { body: { message } } = httpRequest

    if (message.text !== TELEGRAM_ENUM.CLIENT_MESSAGE) {
      await this.sendToTelegram.sendToTelegram({
        payload: [TELEGRAM_ENUM.ERROR_MESSAGE],
        chatId: message.chat.id 
      })
      return success('message has been send')
    }
    return this.controller.handle(httpRequest)
  }
}
