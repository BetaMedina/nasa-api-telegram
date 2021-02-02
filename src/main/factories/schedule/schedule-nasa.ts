import { NasaSchedule } from '../../../presentation/schedule/schedule-controller'
import { GetFeedFactory } from '../use-cases/nasa-to-telegram/get-feed-factory'
import { FormatNasaToTelegram } from '../../../data/use-cases/nasa-feed/format-to-send-to-telegram'
import { PostToTelegramFactory } from '../use-cases/nasa-to-telegram/post-to-telegram'
import { makeScheduleDecorator } from '../decorators/schedule-decorator-factory'

export const makeSchedule = () => {
  console.log('Funcionando')

  const format = new FormatNasaToTelegram()
  const nasaSchedule = new NasaSchedule(GetFeedFactory(), format, PostToTelegramFactory())
  return makeScheduleDecorator(nasaSchedule).handle()
}
