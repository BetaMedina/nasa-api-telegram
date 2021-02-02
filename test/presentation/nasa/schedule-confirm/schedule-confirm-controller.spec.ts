import { HttpRequest } from '../../contract'
import { ScheduleConfirmController } from '../../../../src/presentation/controller/nasa/confirm-schedule/schedule-confirm-controller'
import { serverError, success } from '../../../../src/presentation/helper'
import { ScheduleCreateStub } from '../../mock/use-cases/schedule-confirm'
import { SendToTelegramStub } from '../../mock/use-cases/send-to-telegram'
import { TELEGRAM_ENUM } from '../../../../src/presentation/helper/enum/payload.enum'
import faker from 'faker'

const makeSut = () => {
  const scheduleCreateStub = new ScheduleCreateStub()
  const sendToTelegramSut = new SendToTelegramStub()
  const sut = new ScheduleConfirmController(scheduleCreateStub, sendToTelegramSut)
  return { sut, scheduleCreateStub, sendToTelegramSut }
}

let makePayload:HttpRequest
describe('GetFeedTodayController', () => {
  makePayload = {
    body: {
      message: {
        chat: { id: String(faker.random.number(128311)) },
        text: TELEGRAM_ENUM.CLIENT_CONFIRM_NOTIFY
      }
    }
  }

  it('expected to call telegramApi and send meteor information', async () => {
    const { sendToTelegramSut, sut } = makeSut()
    const params = jest.spyOn(sendToTelegramSut, 'sendToTelegram')
    await sut.handle(makePayload)

    const telegramParams = {
      chatId: makePayload.body.message.chat.id,
      payload: [TELEGRAM_ENUM.NOTIFY_MESSAGE]
    }

    expect(params).toHaveBeenCalledWith(telegramParams)
  })

  it('expected to return 500 when sendToTelegram throws', async () => {
    const { sendToTelegramSut, sut } = makeSut()
    jest.spyOn(sendToTelegramSut, 'sendToTelegram').mockImplementationOnce(() => { throw new Error('validError') })
    const httpResponse = await sut.handle(makePayload)

    expect(httpResponse).toEqual(serverError(new Error('validError')))
  })
  
  it('expected to return 500 when scheduleCreateStub throws', async () => {
    const { scheduleCreateStub, sut } = makeSut()
    jest.spyOn(scheduleCreateStub, 'save').mockImplementationOnce(() => { throw new Error('validError') })
    const httpResponse = await sut.handle(makePayload)

    expect(httpResponse).toEqual(serverError(new Error('validError')))
  })

  it('expected to call scheduleCreateStub with correct params', async () => {
    const { scheduleCreateStub, sut } = makeSut()
    const params = jest.spyOn(scheduleCreateStub, 'save')
    await sut.handle(makePayload)

    expect(params).toHaveBeenCalledWith(makePayload.body.message.chat.id)
  })

  it('Should expected return success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makePayload)

    expect(httpResponse).toEqual(success('Message has been send'))
  })
})
