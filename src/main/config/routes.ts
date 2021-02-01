import { Express, Router } from 'express'
import fg from 'fast-glob'
import { readdirSync } from 'fs'
import { createImportSpecifier } from 'typescript'

export default (app:Express):void => {
  const router = Router()
  app.use(router)
  app.use('/api', router)
  // eslint-disable-next-line node/no-path-concat
  readdirSync(`${__dirname}/../routes`).map(async file => {
    (await import(`../routes/${file}/${file}-routes`)).default(router)
  })
}
