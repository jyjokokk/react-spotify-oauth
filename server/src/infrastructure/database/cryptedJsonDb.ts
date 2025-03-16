import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import Config from 'src/config/config.service'
import {
  Identifiable,
  DBEntityResult
} from '../../domain/interfaces/db-entity.type'
import { v4 as uuidv4 } from 'uuid'
import { encrypt, decrypt } from 'src/utils/encryption.util'
import { JSONObject } from '../../domain/types/json-object.type'

class DatabaseService {
  constructor(private data: Record<string, Identifiable[]> = {}) {
    // TODO: Read filennames from config
    this.loadFromFile('users')
  }

  private getFilePath(collection: string): string {
    const root = process.cwd()
    return join(root, Config.DB_FILE_DIR, `${collection}.json`)
  }

  private loadFromFile(collection: string): void {
    const filePath = this.getFilePath(collection)
    if (existsSync(filePath)) {
      const encryptedData = readFileSync(filePath, 'utf8')
      const decryptedData = decrypt(encryptedData)
      this.data[collection] = JSON.parse(decryptedData) as Identifiable[] &
        JSONObject
      return
    }
    this.data[collection] = []
  }

  private saveToFile(collection: string): void {
    const filePath = this.getFilePath(collection)
    const data = JSON.stringify(this.data[collection])
    const encryptedData = encrypt(data)
    writeFileSync(filePath, encryptedData, 'utf-8')
  }

  public getAll<T>(collection: string): (T | Identifiable)[] {
    const result = this.data[collection]
    if (result.length === 0) return []

    return result
  }

  public getById(collection: string, id: string) {
    const entity = this.data[collection].find(
      (item: Identifiable) => item.id === id
    )
    if (!entity) return null

    return entity
  }

  public create<T>(
    collection: string,
    ...items: T[]
  ): (Identifiable & T)[] | (Identifiable & T) {
    if (!items.length) return []
    const identifiableItems = items.map((item) => ({ ...item, id: uuidv4() }))
    this.data[collection].push(...identifiableItems)
    this.saveToFile(collection)
    if (identifiableItems.length === 1) return identifiableItems[0]
    return identifiableItems
  }

  public update(
    collection: string,
    id: string,
    item: Identifiable
  ): DBEntityResult {
    const index = this.data[collection].findIndex(
      (item: Identifiable) => item.id === id
    )
    if (index === -1) return null

    const updatedItem = { ...this.data[collection][index], ...item }
    this.data[collection][index] = updatedItem
    this.saveToFile(collection)
    return updatedItem
  }

  public delete(collection: string, id: string): boolean {
    const index = this.data[collection].findIndex(
      (item: Identifiable) => item.id === id
    )
    if (index === -1) return false

    this.data[collection].splice(index, 1)
    this.saveToFile(collection)
    return true
  }
}

const JSONDatabaseClient = new DatabaseService()

export default JSONDatabaseClient
