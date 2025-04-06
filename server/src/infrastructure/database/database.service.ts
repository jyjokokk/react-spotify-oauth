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

  async create(...items: T[]): Promise<T | T[]> {
    return this.jsonDatabaseService.create(this.collection, ...items)
  }

  async update(id: string, item: Partial<T>): Promise<T | null> {
    const r = await this.jsonDatabaseService.update(this.collection, id, item)
    return r as T
  }

  async delete(id: string): Promise<boolean> {
    return this.jsonDatabaseService.delete(this.collection, id)
  }
}
