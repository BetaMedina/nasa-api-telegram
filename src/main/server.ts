import dotenv from 'dotenv'
import { MongoHelper } from '@/infra/db/mongo/helper/mongo-helper'

dotenv.config()

MongoHelper.connect(process.env.MONGO_DB).then(async () => {
  const app = (await import('./config/app')).default
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is runing on port ${process.env.PORT || 3000}`)
  })
})
