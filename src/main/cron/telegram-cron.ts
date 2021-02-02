import cron from 'node-cron'
import { makeSchedule } from '../factories/schedule/schedule-nasa'

export default ():void => {
  cron.schedule('0-59 * * * *', () => makeSchedule())
}
