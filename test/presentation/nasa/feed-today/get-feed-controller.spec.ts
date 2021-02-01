import { HttpRequest } from '@/presentation/contract'
import { GetFeedTodayController } from '@/presentation/controller/nasa/feed-today/get-feed-controller'
import { serverError, success } from '@/presentation/helper'
import { FormatNasaToTelegramStub } from '../../mock/use-cases/format-nasa-to-telegram'
import { MakeRequestStub } from '../../mock/use-cases/request-feed'
import { SendToTelegramStub } from '../../mock/use-cases/send-to-telegram'
import faker from 'faker'
import { TELEGRAM_ENUM } from '@/presentation/controller/nasa/feed-today/enum/payload.enum'

const makeSut = () => {
  const requestSut = new MakeRequestStub()
  const formatNasaToTelegramSut = new FormatNasaToTelegramStub()
  const sendToTelegramSut = new SendToTelegramStub()
  const sut = new GetFeedTodayController(requestSut, formatNasaToTelegramSut, sendToTelegramSut)
  return { sut, requestSut, formatNasaToTelegramSut, sendToTelegramSut }
}

let makePayload:HttpRequest
describe('GetFeedTodayController', () => {
  makePayload = {
    body: {
      message: {
        chat: { id: String(faker.random.number(128311)) },
        text: TELEGRAM_ENUM.CLIENT_MESSAGE
      }
    }
  }

  it('Should be return an error when the API response is different than 200', async () => {
    const { requestSut, sendToTelegramSut, sut } = makeSut()
    
    jest.spyOn(requestSut, 'getFeedToday').mockReturnValueOnce(Promise.resolve([]))

    const params = jest.spyOn(sendToTelegramSut, 'sendToTelegram')
    const httpResponse = await sut.handle(makePayload)

    const telegramParams = {
      chatId: makePayload.body.message.chat.id,
      payload: [
        TELEGRAM_ENUM.EMPTY_MESSAGE
      ]
    }

    expect(params).toHaveBeenCalledWith(telegramParams)
    expect(httpResponse).toEqual(success('Message has been send'))
  })

  it("should format the api's response to a text", async () => {
    const { requestSut, formatNasaToTelegramSut, sut } = makeSut()
    const params = jest.spyOn(formatNasaToTelegramSut, 'format')
    await sut.handle(makePayload)

    const nasaApiResponse = [{
      name: requestSut.name,
      close_approach_data: {
        miss_distance: {
          kilometers: requestSut.relativeVelocityKm
        }
      },
      relative_velocity: {
        kilometers_per_second: requestSut.relativeVelocityKm
      },
      estimated_diameter: {
        kilometers: {
          estimated_diameter_min: requestSut.estimatedDiameterMin,
          estimated_diameter_max: requestSut.estimatedDiameterMax
        }
      } 
    }]

    expect(params).toHaveBeenCalledWith(nasaApiResponse)
  })
  it('should expected to call senTelegram with error message', async () => {
    const { sendToTelegramSut, sut } = makeSut()
    const params = jest.spyOn(sendToTelegramSut, 'sendToTelegram')
    await sut.handle({
      body: {
        message: {
          chat: { id: makePayload.body.message.chat.id },
          text: 'Olá'
        }
      }
    })

    const telegramParams = {
      chatId: makePayload.body.message.chat.id,
      payload: [
        TELEGRAM_ENUM.ERROR_MESSAGE
      ]
    }

    expect(params).toHaveBeenCalledWith(telegramParams)
  })

  it('expected to call telegramApi and send meteor information', async () => {
    const { sendToTelegramSut, formatNasaToTelegramSut, sut } = makeSut()
    const params = jest.spyOn(sendToTelegramSut, 'sendToTelegram')
    await sut.handle(makePayload)

    const telegramParams = {
      chatId: makePayload.body.message.chat.id,
      payload: [
        `O Asteroide ${formatNasaToTelegramSut.name} passará hoje na distancia minima(km/h): ${formatNasaToTelegramSut.killometersDiametersMin} e maxima(km/h): ${formatNasaToTelegramSut.killometersDiametersMax}\n
      a uma velocidade relativa de ${formatNasaToTelegramSut.relativeVelocityKm} e com um diâmetro minimo de: ${formatNasaToTelegramSut.estimatedDiameterMin} e maximo ${formatNasaToTelegramSut.estimatedDiameterMax}`
      ]
    }

    expect(telegramParams.chatId).toEqual(sendToTelegramSut.chatId)
    expect(telegramParams.payload).toEqual(sendToTelegramSut.payload)
    expect(params).toHaveBeenCalledWith(telegramParams)
  })

  it('expected to return 500 when sendToTelegram throws', async () => {
    const { sendToTelegramSut, sut } = makeSut()
    jest.spyOn(sendToTelegramSut, 'sendToTelegram').mockImplementationOnce(() => { throw new Error('validError') })
    const httpResponse = await sut.handle(makePayload)

    expect(httpResponse).toEqual(serverError(new Error('validError')))
  })
  it('expected to return 500 when requestSut throws', async () => {
    const { requestSut, sut } = makeSut()
    jest.spyOn(requestSut, 'getFeedToday').mockImplementationOnce(() => { throw new Error('validError') })
    const httpResponse = await sut.handle(makePayload)

    expect(httpResponse).toEqual(serverError(new Error('validError')))
  })
  it('expected to return 500 when requestSut throws', async () => {
    const { sendToTelegramSut, sut } = makeSut()
    jest.spyOn(sendToTelegramSut, 'sendToTelegram').mockImplementationOnce(() => { throw new Error('validError') })
    const httpResponse = await sut.handle(makePayload)

    expect(httpResponse).toEqual(serverError(new Error('validError')))
  })

  it('Should expected return success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makePayload)

    expect(httpResponse).toEqual(success('Message has been send'))
  })
})
