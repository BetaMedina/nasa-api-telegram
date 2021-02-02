import { makeSchedule } from '../../../main/factories/schedule/schedule-nasa'
import { makeSelectMessageDecorator } from '../../../main/factories/decorators/select-message'
import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-router-adapter'
 
export default (route: Router):void => {
  route.post('/telegram', adaptRoute(makeSelectMessageDecorator()))
  route.post('/teste', adaptRoute(makeSchedule()))
}
