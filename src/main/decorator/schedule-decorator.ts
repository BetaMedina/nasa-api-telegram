
import { Controller, HttpResponse } from '../../presentation/contract'
import { serverError, success } from '../../presentation/helper'
import { IGetAllSchedulesRepository } from '../../data/contract/schedule-confirm/get-schedules'
import { Schedule } from '../../presentation/schedule'

export class ScheduleDecorator implements Controller {
  constructor (
    private readonly getMessages:IGetAllSchedulesRepository, 
    private readonly schedule:Schedule
    
  ) {}

  async handle ():Promise<HttpResponse> {
    try {
      const getAllSchedules = await this.getMessages.get()
      if (getAllSchedules.length) {
        await Promise.all(
          getAllSchedules.map(async cron => {
            await this.schedule.handle(cron.id)
          })
        )
      }
      return success('Success operation')
    } catch (err) {
      return serverError(err)
    }
  }
}
