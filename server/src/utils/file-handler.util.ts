import { promises as fs } from 'fs'
import { FileSystemError } from '../domain/errors/fs-errors'

export async function writeToFile(path: string, data: string) {
  try {
    await fs.access(path, fs.constants.F_OK | fs.constants.W_OK)
  } catch {
    throw new FileSystemError(`File does not exist or no write access: ${path}`)
  }
  await fs.writeFile(path, data, { encoding: 'utf-8', flag: 'w' })
}

export async function appendToFile(path: string, data: string) {
  try {
    await fs.access(path, fs.constants.F_OK | fs.constants.W_OK)
  } catch {
    throw new FileSystemError(`File does not exist or no write access: ${path}`)
  }
  await fs.appendFile(path, data, { encoding: 'utf-8' })
}

export async function readFromFile(path: string): Promise<string> {
  try {
    await fs.access(path, fs.constants.F_OK)
  } catch {
    throw new FileSystemError(`File not found or does not exist: ${path}`)
  }
  return await fs.readFile(path, { encoding: 'utf-8' })
}

export async function fileOrDirExists(path: string): Promise<boolean> {
  try {
    await fs.access(path, fs.constants.F_OK)
    return true
  } catch {
    return false
  }
}
