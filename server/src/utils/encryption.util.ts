import crypto from 'crypto'
import Config from '../config/config.service'

const { ENCRYPTION_KEY } = Config
const IV = crypto.randomBytes(16)

export function encrypt(text: string): string {
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    IV
  )
  const encrypted = cipher.update(text)
  const encryptedConcated = Buffer.concat([encrypted, cipher.final()])
  return IV.toString('hex') + ':' + encryptedConcated.toString('hex')
}

export function decrypt(text: string): string {
  if (!text) {
    return ''
  }
  const textParts = text.split(':')
  const shifted = textParts.shift()
  const iv = Buffer.from(shifted!, 'hex')
  const encryptedText = Buffer.from(textParts.join(':'), 'hex')
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv
  )
  const deciphered = decipher.update(encryptedText)
  const decrypted = Buffer.concat([deciphered, decipher.final()])
  return decrypted.toString()
}

export default { encrypt, decrypt }
