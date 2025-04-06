export interface DatabaseService<T> {
  getAll: () => T[]
}

export type Repository<T> = DatabaseService<T>
