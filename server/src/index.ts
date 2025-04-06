import express from 'express'
import JSONDatabaseClient from './infrastructure/database/cryptedJsonDb'
import { configService } from './config/config.service'
const app = express()

const port = configService.get('PORT') as string

async function dbOps() {
  await JSONDatabaseClient.init()

  const users = JSONDatabaseClient.getAll('users')
  console.log(users)

  // const user = JSONDatabaseClient.getById(
  //   'users',
  //   '99847044-3a9e-42de-90ae-cc7dcbae406e'
  // )
  // console.log(user)
  return true
}

dbOps()
  .then(() => {
    console.log('Database operations completed successfully.')
  })
  .catch((error: unknown) => {
    console.error('Error during database operations:', error)
    process.exit(1) // Exit the application if dbOps fails
  })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
