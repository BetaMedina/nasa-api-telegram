import { AxiosAdapter } from '../../../../infra/adapters/axios/axios-adapter'
import { GetFeedToday } from '../../../../data/use-cases/nasa-feed/get-feed-today'

export const GetFeedFactory = () => {
  const request = new AxiosAdapter()
  return new GetFeedToday(request)
}
