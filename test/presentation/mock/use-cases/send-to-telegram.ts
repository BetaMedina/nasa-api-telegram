import { ISendToTelegram } from '@/domain/use-cases/send-telegram-api'

export class SendToTelegramStub implements ISendToTelegram {
  payload:Array<String>
  chatId:String
  async sendToTelegram (payload:ISendToTelegram.payload):Promise<void> {
    this.payload = payload.payload
    this.chatId = payload.chatId
  }
}
