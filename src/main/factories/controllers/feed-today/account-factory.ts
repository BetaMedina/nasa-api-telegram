import { GetFeedTodayController } from '../../../../presentation/controller/nasa/feed-today/get-feed-controller'
import { GetFeedFactory } from '../../../../main/factories/use-cases/nasa-to-telegram/get-feed-factory'
import { FormatNasaToTelegram } from '../../../../data/use-cases/nasa-feed/format-to-send-to-telegram'
import { PostToTelegramFactory } from '../../../../main/factories/use-cases/nasa-to-telegram/post-to-telegram'
import { makeMessageDecorator } from '../../decorators/telegram-message-factory'

export const makeFeedTodayController = () => {
  const formatToTelegram = new FormatNasaToTelegram()
  const controller = new GetFeedTodayController(GetFeedFactory(), formatToTelegram, PostToTelegramFactory())
  return makeMessageDecorator(controller)
}
