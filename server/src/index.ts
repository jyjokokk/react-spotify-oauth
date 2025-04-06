import express from 'express'
import { configService } from './config/config.service'
import { UserRepository } from './infrastructure/repositories/user.repository'
import { initApp } from './config/initApp'
const app = express()

const port = configService.get('PORT') as string

async function dbOps() {
  await initApp()
  const userRepository = new UserRepository()
  const users = await userRepository.getAll()
  console.log(users)
  // const user = await userRepository.getById(
  //   '99847044-3a9e-42de-90ae-cc7dcbae406e'
  // )
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

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
