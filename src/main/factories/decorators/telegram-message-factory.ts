import { Controller } from '../../../presentation/contract'
import { PostToTelegramFactory } from '../use-cases/nasa-to-telegram/post-to-telegram'
import { TelegramMessageDecorator } from '../../decorator/telegram-message-interceptor'

export const makeMessageDecorator = (controller:Controller) => {
  return new TelegramMessageDecorator(controller, PostToTelegramFactory())
}
