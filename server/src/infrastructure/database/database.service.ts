import jsonDBService from './cryptedJsonDb'

export class DatabaseService<T> {
  constructor(
    private readonly collection: string,
    private readonly jsonDatabaseService = jsonDBService
  ) {}

  async init(): Promise<void> {
    await this.jsonDatabaseService.init()
  }

  async getAll(): Promise<T[]> {
    await Promise.resolve()
    return this.jsonDatabaseService.getAll<T>(this.collection)
  }

  async getById(id: string): Promise<T> {
    await Promise.resolve()
    return this.jsonDatabaseService.getById(this.collection, id) as T
  }

  async create(...items: Partial<T>[]): Promise<T | T[]> {
    const withTimestamp = items.map((item) => ({
      ...item,
      createdAt: new Date()
    }))
    const r = await this.jsonDatabaseService.create(
      this.collection,
      ...withTimestamp
    )
    return r as T | T[]
  }

  async update(id: string, item: Partial<T>): Promise<T | null> {
    const updatedItem = {
      ...item,
      updatedAt: new Date()
    }
    const r = await this.jsonDatabaseService.update(
      this.collection,
      id,
      updatedItem
    )
    return r as T
  }

  async delete(id: string): Promise<boolean> {
    return this.jsonDatabaseService.delete(this.collection, id)
  }
}
