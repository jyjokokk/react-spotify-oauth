import type { User } from '../../domain/entities/user.entity'
import { DatabaseService } from '../database/database.service'
export class UserRepository {
  constructor(
    private readonly databaseService = new DatabaseService<User>('users')
  ) {}

  async getAll(): Promise<User[]> {
    return this.databaseService.getAll()
  }

  async getById(id: string): Promise<User | null> {
    return this.databaseService.getById(id)
  }

  async create(user: User): Promise<User> {
    const createdUser = await this.databaseService.create(user)
    return createdUser as User
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    const updatedUser = await this.databaseService.update(id, user)
    return updatedUser
  }

  async delete(id: string): Promise<boolean> {
    return this.databaseService.delete(id)
  }
}
