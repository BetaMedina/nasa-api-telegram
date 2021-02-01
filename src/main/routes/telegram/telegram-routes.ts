import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-router-adapter'
import { makeFeedTodayController } from '../../../main/factories/controllers/feed-today/account-factory'
 
export default (route: Router):void => {
  route.post('/telegram', adaptRoute(makeFeedTodayController()))
}
