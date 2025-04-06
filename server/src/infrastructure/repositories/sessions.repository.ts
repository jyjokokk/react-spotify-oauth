import type { Session } from '../../domain/entities/session.entity'
import { DatabaseService } from '../database/database.service'
export class UserRepository {
  constructor(
    private readonly databaseService = new DatabaseService<Session>('playlists')
  ) {}

  async getAll(): Promise<Session[]> {
    return this.databaseService.getAll()
  }

  async getById(id: string): Promise<Session | null> {
    return this.databaseService.getById(id)
  }

  async create(user: Partial<Session>): Promise<Session> {
    const createdUser = await this.databaseService.create(user)
    return createdUser as Session
  }

  async update(id: string, user: Partial<Session>): Promise<Session | null> {
    const updatedUser = await this.databaseService.update(id, user)
    return updatedUser
  }

  async delete(id: string): Promise<boolean> {
    return this.databaseService.delete(id)
  }
}
