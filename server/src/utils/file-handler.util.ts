import { promises as fs } from 'fs'
import { FileSystemError } from '../domain/errors/fs-errors'

export async function writeToFile(path: string, data: string) {
  try {
    await fs.access(path)
  } catch {
    throw new FileSystemError(`Path is not accessible: ${path}`)
  }
  await fs.writeFile(path, data, { encoding: 'utf-8', flag: 'w' })
}

export async function readFile(path: string): Promise<string> {
  try {
    await fs.access(path)
  } catch {
    throw new FileSystemError(`File not found or does not exist: ${path}`)
  }
  return await fs.readFile(path, { encoding: 'utf-8' })
}
