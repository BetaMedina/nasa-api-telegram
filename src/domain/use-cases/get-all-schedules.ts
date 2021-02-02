import { ISchedule } from '../entitys/schedule-entity'

export interface IGetAllSchedules{
  get():Promise<ISchedule[]>
}
