import { AxiosAdapter } from '../../../../infra/adapters/axios/axios-adapter'
import { SendToTelegram } from '../../../../data/use-cases/nasa-feed/send-to-telegram'

export const PostToTelegramFactory = () => {
  const request = new AxiosAdapter()
  return new SendToTelegram(request)
}
