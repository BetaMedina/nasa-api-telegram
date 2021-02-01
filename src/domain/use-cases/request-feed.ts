import { INasaEntity } from '../entitys/nasa-entity'

export interface IRequestFeed {
  getFeedToday:()=>Promise<INasaEntity[]>
}
