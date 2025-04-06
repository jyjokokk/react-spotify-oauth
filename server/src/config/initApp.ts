import JSONDatabaseClient from '../infrastructure/database/cryptedJsonDb'
import { configService } from './config.service'

export async function initApp(): Promise<void> {
  configService.getConfig()
  await JSONDatabaseClient.init()
}
