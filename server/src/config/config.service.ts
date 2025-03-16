import * as dotenv from 'dotenv'

dotenv.config()

const port: string = process.env.PORT || '3001'
const dbFileDir = process.env.DB_FILE_DIR || 'db'

const Config = {
  ...process.env,
  PORT: parseInt(port, 10),
  dbFileDir
}
export default Config
