import { ScheduleDecorator } from '../../decorator/schedule-decorator'
import { Schedule } from '../../../presentation/contract/schedule'
import { ScheduleRepository } from '../../../infra/db/mongo/repository/schedule-confirm-repository'

export const makeScheduleDecorator = (schedule:Schedule) => {
  const repo = new ScheduleRepository()
  return new ScheduleDecorator(repo, schedule)
}
