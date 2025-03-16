import express from 'express'
import Config from 'src/config/config.service'

const app = express()

const port = Config.PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
