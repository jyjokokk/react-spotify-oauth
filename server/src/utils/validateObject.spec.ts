/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { validateObject } from './validateObject'
import { IsString, IsInt, MinLength } from 'class-validator'
import { ValidatingError } from '../domain/errors/validating-errors'

class TestSchema {
  @IsString()
  @MinLength(3)
  name!: string

  @IsInt()
  age!: number
}

describe('validateObject', () => {
  it('should validate and return the object when it matches the schema', () => {
    const validObject = { name: 'John', age: 30 }
    const result = validateObject(validObject, TestSchema)
    expect(result).toEqual(validObject)
  })

  it('should throw a ValidatingError when the object does not match the schema', () => {
    const invalidObject = { name: 'Jo', age: 'thirty' }
    expect(() => validateObject(invalidObject, TestSchema)).toThrow(
      ValidatingError
    )
  })

  it('should throw a ValidatingError with detailed messages for validation errors', () => {
    const invalidObject = { name: 'Jo', age: 'thirty' }
    try {
      validateObject(invalidObject, TestSchema)
    } catch (error) {
      expect(error).toBeInstanceOf(ValidatingError)
      expect(error.message).toContain(
        'name must be longer than or equal to 3 characters'
      )
      expect(error.message).toContain('age must be an integer number')
    }
  })

  it('should handle empty objects and throw a ValidatingError', () => {
    const emptyObject = {}
    expect(() => validateObject(emptyObject, TestSchema)).toThrow(
      ValidatingError
    )
  })

  it('should handle additional properties not defined in the schema', () => {
    const objectWithExtraProps = { name: 'John', age: 30, extra: 'extraValue' }
    const result = validateObject(objectWithExtraProps, TestSchema)
    expect(result).toEqual({ name: 'John', age: 30, extra: 'extraValue' })
  })
})
