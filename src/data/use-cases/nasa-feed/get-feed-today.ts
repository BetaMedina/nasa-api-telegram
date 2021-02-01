import { IGetRequestAdapter } from '../../../data/contract/request-adapter/get-request-adapter'
import { INasaEntity } from '../../..//domain/entitys/nasa-entity'
import { IRequestFeed } from '../../../domain/use-cases/request-feed'

import { NASA_FEED } from './enum/nasa-feed.enum'

export class GetFeedToday implements IRequestFeed {
  constructor (private readonly requestAdapter: IGetRequestAdapter) {}

  async getFeedToday ():Promise<INasaEntity[]> {
    const feedToday = await this.requestAdapter.get(NASA_FEED.ENDPOINT_API)
    if (feedToday.data.element_count) {
      const dateNow = new Date().toISOString().split('T')[0]
      return feedToday.data.near_earth_objects[dateNow]
    }
    return []
  }
}
