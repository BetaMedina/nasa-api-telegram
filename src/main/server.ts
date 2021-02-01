import server from './config/app'
import dotenv from 'dotenv'

dotenv.config()

server.listen('3333', () => {
  console.log('Server is running on port 3333 ')
})
