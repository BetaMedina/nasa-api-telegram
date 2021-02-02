
import { IFormatNasaToTelegram, TELEGRAM_ENUM, IRequestFeed, ISendToTelegram, Schedule } from './'

export class NasaSchedule implements Schedule {
  constructor (
    private readonly feed:IRequestFeed, 
    private readonly formatToTelegram:IFormatNasaToTelegram,
    private readonly sendToTelegram:ISendToTelegram
  ) {}

  async handle (id):Promise<void> {
    try {
      const feedToday = await this.feed.getFeedToday()
      
      if (feedToday.length) {
        const nasaFormatted = await this.formatToTelegram.format(feedToday)

        await this.sendToTelegram.sendToTelegram({ payload: nasaFormatted, chatId: id })
        return
      } 

      await this.sendToTelegram.sendToTelegram({
        payload: [TELEGRAM_ENUM.EMPTY_MESSAGE],
        chatId: id 
      })
    } catch (err) {
      console.log(err.message)
    }
  }
}
