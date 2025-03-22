import express from 'express'
// import JSONDatabaseClient from './infrastructure/database/cryptedJsonDb'
import { configService } from './config/config.service'

const app = express()

const port = configService.get('PORT') as string

// interface User {
//   email: string
//   password: string
// }

// const sampleUser = {
//   email: 'user@example.com',
//   password: 'password'
// }

// JSONDatabaseClient.create('users', sampleUser)
// const users = JSONDatabaseClient.getAll<User>('users')

// console.log(users)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
