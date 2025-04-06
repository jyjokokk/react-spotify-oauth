import type { Playlist } from '../../domain/entities/playlist.entity'
import { DatabaseService } from '../database/database.service'
export class UserRepository {
  constructor(
    private readonly databaseService = new DatabaseService<Playlist>(
      'playlists'
    )
  ) {}

  async getAll(): Promise<Playlist[]> {
    return this.databaseService.getAll()
  }

  async getById(id: string): Promise<Playlist | null> {
    return this.databaseService.getById(id)
  }

  async create(user: Partial<Playlist>): Promise<Playlist> {
    const createdUser = await this.databaseService.create(user)
    return createdUser as Playlist
  }

  async update(id: string, user: Partial<Playlist>): Promise<Playlist | null> {
    const updatedUser = await this.databaseService.update(id, user)
    return updatedUser
  }

  async delete(id: string): Promise<boolean> {
    return this.databaseService.delete(id)
  }
}
