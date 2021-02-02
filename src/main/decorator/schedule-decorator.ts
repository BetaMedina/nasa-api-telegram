
import { Controller, HttpRequest, HttpResponse } from '../../presentation/contract'
import { serverError, success } from '../../presentation/helper'
import { IGetAllSchedulesRepository } from '../../data/contract/schedule-confirm/get-schedules'
import { Schedule } from '@/presentation/schedule'

export class ScheduleDecorator implements Controller {
  constructor (
    private readonly getMessages:IGetAllSchedulesRepository, 
    private readonly schedule:Schedule
    
  ) {}

  async handle (httpRequest:HttpRequest):Promise<HttpResponse> {
    const { body: { message } } = httpRequest
    console.log(message)
    try {
      const getAllSchedules = await this.getMessages.get()
      console.log(getAllSchedules)
      await Promise.all(
        getAllSchedules.map(async cron => {
          await this.schedule.handle(cron.id)
        })
      )
      return success('Success operation')
    } catch (err) {
      console.log(err.message)
      return serverError(err)
    }
  }
}
