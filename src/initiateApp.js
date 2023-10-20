import { gracefulShutdown } from 'node-schedule'
import { dbConnection } from '../DB/connection.js'
import * as allRouter from './modules/index.routes.js'
import { overdueCron } from './utils/crons.js'
import { globalResponse } from './utils/errorhandling.js'

export const initiateApp = (express, app) => {
  const port = process.env.PORT || 5000

  app.use(express.json())
  dbConnection()

  app.use(`/auth`, allRouter.authRouter)
  app.use(`/book`, allRouter.bookRouter)
  app.use('/borrower', allRouter.borrowerRouter)

  app.use(globalResponse)

  app.use('*', (req, res, next) => {
    return res.status(404).json({ message: 'Invalid Url- 404 Not Found' })
  })

  overdueCron()
  gracefulShutdown() // graceful shutdown of the above cron job

  app.get('/', (req, res) => res.json({ message: 'Hello World!' }))
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}
