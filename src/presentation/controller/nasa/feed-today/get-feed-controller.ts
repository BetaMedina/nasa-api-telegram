import { IFormatNasaToTelegram, TELEGRAM_ENUM, IRequestFeed, ISendToTelegram, Controller, HttpRequest, HttpResponse, serverError, success } from './'

export class GetFeedTodayController implements Controller {
  constructor (
    private readonly feed:IRequestFeed, 
    private readonly formatToTelegram:IFormatNasaToTelegram,
    private readonly sendToTelegram:ISendToTelegram
  ) {}

  async handle (httpRequest:HttpRequest):Promise<HttpResponse> {
    try {
      const { body: { message } } = httpRequest

      const feedToday = await this.feed.getFeedToday()
      
      if (!feedToday.length) {
        await this.sendToTelegram.sendToTelegram({
          payload: [TELEGRAM_ENUM.EMPTY_MESSAGE],
          chatId: message.chat.id 
        })
        return success('Message has been send')
      } 

      const nasaFormatted = await this.formatToTelegram.format(feedToday)

      await this.sendToTelegram.sendToTelegram({ payload: nasaFormatted, chatId: message.chat.id })
      await this.sendToTelegram.sendToTelegram({ payload: [TELEGRAM_ENUM.CRON_MESSAGE], chatId: message.chat.id })

      return success('Message has been send')
    } catch (err) {
      console.log(err)
      return serverError(err)
    }
  }
}
