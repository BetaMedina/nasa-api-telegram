
import { HttpResponse } from '../contract'
import { success } from '../helper'
import { IFormatNasaToTelegram, TELEGRAM_ENUM, IRequestFeed, ISendToTelegram, Schedule } from './'

export class NasaSchedule implements Schedule {
  constructor (
    private readonly feed:IRequestFeed, 
    private readonly formatToTelegram:IFormatNasaToTelegram,
    private readonly sendToTelegram:ISendToTelegram
  ) {}

  async handle (id):Promise<HttpResponse> {
    try {
      const feedToday = await this.feed.getFeedToday()
      
      if (feedToday.length) {
        const nasaFormatted = await this.formatToTelegram.format(feedToday)

        await this.sendToTelegram.sendToTelegram({ payload: nasaFormatted, chatId: id })
        return success('message has been send')
      } 

      await this.sendToTelegram.sendToTelegram({
        payload: [TELEGRAM_ENUM.EMPTY_MESSAGE],
        chatId: id 
      })
      return success('message has been send')
    } catch (err) {
      console.log(err.message)
    }
  }
}
