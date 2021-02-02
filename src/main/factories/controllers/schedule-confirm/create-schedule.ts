import { ScheduleConfirmController } from '../../../../presentation/controller/nasa/confirm-schedule/schedule-confirm-controller'
import { ScheduleRepository } from '../../../../infra/db/mongo/repository/schedule-confirm-repository'
import { PostToTelegramFactory } from '../../use-cases/nasa-to-telegram/post-to-telegram'
import { Controller } from '../../../../presentation/contract'

export const makeScheduleController = ():Controller => {
  const repository = new ScheduleRepository()
  return new ScheduleConfirmController(repository, PostToTelegramFactory())
}
