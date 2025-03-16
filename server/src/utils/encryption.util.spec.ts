import { encrypt, decrypt } from './encryption.util'

jest.mock('../config/config.service', () => ({
  ENCRYPTION_KEY: '12345678901234567890123456789012'
}))

describe('encrypt', () => {
  it('should encrypt a given text', () => {
    const text = 'Hello, World!'
    const encryptedText = encrypt(text)
    expect(encryptedText).toBeDefined()
    expect(typeof encryptedText).toBe('string')
    expect(encryptedText).not.toEqual(text)
  })
})

describe('decrypt', () => {
  it('should decrypt an encrypted text back to the original text', () => {
    const text = 'Hello, World!'
    const encryptedText = encrypt(text)
    const decryptedText = decrypt(encryptedText)
    console.log(decryptedText)
    expect(decryptedText).toBe(text)
  })

  it('should return an empty string when decrypting an empty string', () => {
    const decryptedText = decrypt('')
    expect(decryptedText).toBe('')
  })

  it('should throw an error if the encrypted text is malformed', () => {
    const malformedText = 'malformedtext'
    expect(() => decrypt(malformedText)).toThrow()
  })
})
