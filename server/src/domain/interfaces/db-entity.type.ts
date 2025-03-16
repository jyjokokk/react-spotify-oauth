export interface Identifiable {
  id: string
}

export interface Timestamped {
  createdAt: Date
  updatedAt?: Date
}

export type DBEntity = Identifiable & Timestamped

export type DBEntityResult = Identifiable | null
