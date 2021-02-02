import { MessageDecorator } from '../../decorator/select-message'
import { PostToTelegramFactory } from '../use-cases/nasa-to-telegram/post-to-telegram'

export const makeSelectMessageDecorator = () => {
  return new MessageDecorator(PostToTelegramFactory())
}
