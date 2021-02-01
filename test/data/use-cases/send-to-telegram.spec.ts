import { SendToTelegram } from '../../../src/data/use-cases/nasa-feed/send-to-telegram'
import { IRequestPostAdapter } from '../mock/post-request-adapter'
import faker from 'faker'
import { NASA_FEED } from '../../../src/data/use-cases/nasa-feed/enum/nasa-feed.enum'

const makeSut = () => {
  const requestAdapterStub = new IRequestPostAdapter()
  const sut = new SendToTelegram(requestAdapterStub)
  return {
    requestAdapterStub,
    sut
  }
}

let makePayload

describe('Send to telegram', () => {
  beforeEach(() => {
    makePayload = {
      payload: [],
      chatId: faker.random.number(10)
    }
  })
  it('Should expected to call post adapter with correct parameters', async () => {
    const { requestAdapterStub, sut } = makeSut()
    const params = jest.spyOn(requestAdapterStub, 'post')

    await sut.sendToTelegram(makePayload)

    expect(params).toHaveBeenCalledWith(NASA_FEED.LAMBDA_URL, {
      nasaData: makePayload.payload,
      chatId: makePayload.chatId
    })
  })
  it('Should expected to throw when post return status !== 200', async () => {
    const { requestAdapterStub, sut } = makeSut()
    jest.spyOn(requestAdapterStub, 'post').mockImplementationOnce(() => {
      throw new Error('validError')
    })

    expect(sut.sendToTelegram(makePayload)).rejects.toThrowError('validError')
  })
})
