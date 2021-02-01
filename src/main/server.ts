import server from './config/app'
import dotenv from 'dotenv'

dotenv.config()

server.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3333 ')
})
