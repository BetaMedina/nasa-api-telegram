import { MongoHelper } from '../helper/mongo-helper'
import { ISaveScheduleRepository } from '../../../../data/contract/schedule-confirm/save-schedule'
import { IGetAllSchedules } from '@/domain/use-cases/get-all-schedules'
import { ISchedule } from '@/domain/entitys/schedule-entity'

export class ScheduleRepository implements ISaveScheduleRepository, IGetAllSchedules {
  async save (id:Number): Promise<void> {
    const collection = await MongoHelper.getCollection('schedule_telegram')
    await collection.insertOne({ id: id, createdAt: new Date(), updatedAt: new Date() })
  }

  async get (): Promise<ISchedule[]> {
    const collection = await MongoHelper.getCollection('schedule_telegram')
    const result = []
    await collection.find({}).forEach((item) => {
      result.push(item)
    })
    return result
  }
}
