import { IPostRequestAdapter } from '../../../data/contract/request-adapter/post-request-adapter'
import { ISendToTelegram } from '../../../domain/use-cases/send-telegram-api'
import { BadRequestError } from '../../../presentation/errors/bad-request'

import { NASA_FEED } from './enum/nasa-feed.enum'

export class SendToTelegram implements ISendToTelegram {
  constructor (private readonly requestAdapter: IPostRequestAdapter) {}

  async sendToTelegram (payload:ISendToTelegram.payload):Promise<void> {
    const response = await this.requestAdapter.post(NASA_FEED.LAMBDA_URL, {
      nasaData: payload.payload,
      chatId: payload.chatId
    })
    if (response.status !== 200) {
      throw new BadRequestError(`Lambda return status ${response.status}`)
    }
  }
}
