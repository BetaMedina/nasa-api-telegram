import { IScheduleConfirm } from '@/domain/use-cases/schedule-confirm'
import { ISendToTelegram, TELEGRAM_ENUM, Controller, HttpRequest, HttpResponse, serverError, success } from './'

export class ScheduleConfirmController implements Controller {
  constructor (
    private readonly condfirmSchedule:IScheduleConfirm,
    private readonly sendToTelegram:ISendToTelegram
  ) {}

  async handle (httpRequest:HttpRequest):Promise<HttpResponse> {
    try {
      const { body: { message } } = httpRequest

      await this.condfirmSchedule.save(message.chat.id)
      await this.sendToTelegram.sendToTelegram({ payload: [TELEGRAM_ENUM.NOTIFY_MESSAGE], chatId: message.chat.id })

      return success('Message has been send')
    } catch (err) {
      return serverError(err)
    }
  }
}
