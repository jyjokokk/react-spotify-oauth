import { config } from 'dotenv'
import applicationConfig from '../../config'

const PORT: string = process.env.PORT || '3001'
const DB_FILE_DIR = process.env.DB_FILE_DIR || 'db'
const ENCRYPTION_KEY: string =
  process.env.ENCRYPTION_KEY || '12345678901234567890123456789012'

config()

const Config = {
  ...process.env,
  ...applicationConfig,
  PORT: parseInt(PORT, 10),
  DB_FILE_DIR,
  ENCRYPTION_KEY
} as const
export default Config
