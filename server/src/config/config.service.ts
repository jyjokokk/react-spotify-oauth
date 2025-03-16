import * as dotenv from 'dotenv'

dotenv.config()

const PORT: string = process.env.PORT || '3001'
const DB_FILE_DIR = process.env.DB_FILE_DIR || 'db'
const ENCRYPTION_KEY: string =
  process.env.ENCRYPTION_KEY || '12345678901234567890123456789012'

const Config = {
  ...process.env,
  PORT: parseInt(PORT, 10),
  DB_FILE_DIR,
  ENCRYPTION_KEY
}
export default Config
