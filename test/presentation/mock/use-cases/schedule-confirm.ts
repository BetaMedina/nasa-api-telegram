import { IScheduleConfirm } from '@/domain/use-cases/schedule-confirm'

export class ScheduleCreateStub implements IScheduleConfirm {
  id:Number
  chatId:String
  async save (id:Number):Promise<void> {
    this.id = id
  }
}
