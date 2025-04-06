import { join } from 'path'
import { type ConfigService, configService } from '../../config/config.service'
import {
  Identifiable,
  DBEntityResult,
  DBEntity
} from '../../domain/types/database-entity.types'
import { v4 as uuidv4 } from 'uuid'
import { JSONObject } from '../../domain/types/json-object.type'
import { decrypt, encrypt } from '../../utils/encryption.util'
import { DatabaseConfig } from '../../domain/types/database-service.types'
import {
  fileOrDirExists,
  readFromFile,
  writeToFile
} from '../../utils/file-handler.util'

export class JSONDatabaseService {
  private data: Record<string, Identifiable[]> = {}

  constructor(private readonly configService: ConfigService) {}

  async init(): Promise<void> {
    const database = this.configService.get('database') as DatabaseConfig
    if (Array.isArray(database.collections)) {
      for (const collection of database.collections) {
        await this.loadFromFile(collection)
      }
    }
  }

  private getFilePath(collection: string): string {
    const DB_FILE_DIR = this.configService.get('DB_FILE_DIR') as string
    const root = process.cwd()
    return join(root, DB_FILE_DIR, `${collection}.enc`)
  }

  private async loadFromFile(collection: string): Promise<void> {
    const filePath = this.getFilePath(collection)
    if (await fileOrDirExists(filePath)) {
      const encryptedData = await readFromFile(filePath)
      const decryptedData = decrypt(encryptedData)
      this.data[collection] = JSON.parse(decryptedData) as DBEntity[] &
        JSONObject
      return
    }
    this.data[collection] = []
    await this.saveToFile(collection)
  }

  private async saveToFile(collection: string): Promise<void> {
    const filePath = this.getFilePath(collection)
    const data = JSON.stringify(this.data[collection])
    const encryptedData = encrypt(data)
    await writeToFile(filePath, encryptedData)
  }

  public getAll<T>(collection: string): T[] {
    const result = this.data[collection] as T[]
    if (result.length === 0) return []

    return result
  }

  public getById(collection: string, id: string): DBEntityResult {
    const entity = this.data[collection].find((item) => item.id === id)
    if (!entity) return null
    return entity
  }

  public async create<T>(collection: string, ...items: T[]): Promise<T | T[]> {
    if (!items.length) return []
    const itemEntities = items.map((item) => ({
      ...item,
      id: uuidv4(),
      createdAt: new Date()
    }))
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!this.data[collection]) {
      this.data[collection] = []
    }
    this.data[collection].push(...itemEntities)
    await this.saveToFile(collection)
    if (itemEntities.length === 1) return itemEntities[0]
    return itemEntities
  }

  public async update<T extends DBEntity>(
    collection: string,
    id: string,
    item: Partial<T>
  ): Promise<T | null> {
    const index = this.data[collection].findIndex(
      (item: Identifiable) => item.id === id
    )
    if (index === -1) return null

    const updatedItem = { ...this.data[collection][index], ...item }
    this.data[collection][index] = updatedItem
    await this.saveToFile(collection)
    return this.data[collection][index] as T
  }

  public async delete(collection: string, id: string): Promise<boolean> {
    const index = this.data[collection].findIndex(
      (item: Identifiable) => item.id === id
    )
    if (index < 0) return false

    this.data[collection].splice(index, 1)
    await this.saveToFile(collection)
    return true
  }
}

export default new JSONDatabaseService(configService)
