import { IFormatNasaToTelegram, IRequestFeed, ISendToTelegram, Controller, HttpRequest, HttpResponse, badRequest, serverError, success } from './'
import { TELEGRAM_ENUM } from './enum/payload.enum'

export class GetFeedTodayController implements Controller {
  constructor (
    private readonly feed:IRequestFeed, 
    private readonly formatToTelegram:IFormatNasaToTelegram,
    private readonly sendToTelegram:ISendToTelegram
  ) {}

  async handle (httpRequest:HttpRequest):Promise<HttpResponse> {
    try {
      const { body: { message } } = httpRequest
      if (message.text === TELEGRAM_ENUM.CLIENT_MESSAGE) {
        const feedToday = await this.feed.getFeedToday()
      
        if (!feedToday.length) {
          await this.sendToTelegram.sendToTelegram({
            payload: [TELEGRAM_ENUM.EMPTY_MESSAGE],
            chatId: message.chat.id 
          })
          return success('Message has been send')
        } 

        const nasaFormatted = await this.formatToTelegram.format(feedToday)
        return success(nasaFormatted)

        await this.sendToTelegram.sendToTelegram({ payload: nasaFormatted, chatId: message.chat.id })

        return success('Message has been send')
      }
      
      await this.sendToTelegram.sendToTelegram({
        payload: [TELEGRAM_ENUM.ERROR_MESSAGE],
        chatId: message.chat.id 
      })
      
      return success('Message has been send')
    } catch (err) {
      return serverError(err)
    }
  }
}
