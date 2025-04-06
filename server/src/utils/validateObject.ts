/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import { plainToClass } from 'class-transformer'
import { validateSync } from 'class-validator'
import { ValidatingError } from '../domain/errors/validating-errors';

export function validateObject<T extends Object>(
  object: unknown,
  schema: new () => T
): T {
  const instance = plainToClass(schema, object)
  const validationErrors = validateSync(instance)
  if (validationErrors.length > 0) {
    throw new ValidatingError(
      `Validation error: ${validationErrors
        .map((error) => Object.values(error.constraints || {}))
        .join(', ')}`
    )
  }
  return instance
}
