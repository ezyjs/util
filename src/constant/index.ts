export class ConstantValue {
  public static readonly POSITIVE_VALUES = ['y', 'yes', 'o', 'ok', 'on', 't', 'true', '1']

  public static ENCODING_TYPE: {
    UTF_8: 'utf-8'
  }

  public static ERROR_DEFINITIONS: { [key: string]: { message: string, statusCode: number } } = {
    VALIDATION_ERROR: { message: 'Validation Error', statusCode: 400 },
    NOT_FOUND: { message: 'Not Found', statusCode: 404 },
    UNAUTHORIZED: { message: 'Unauthorized', statusCode: 401 },
    FORBIDDEN: { message: 'Forbidden', statusCode: 403 },
    INTERNAL_SERVER_ERROR: { message: 'Internal Server Error', statusCode: 500 },
    BAD_REQUEST: { message: 'Bad Request', statusCode: 400 },
    CONFLICT: { message: 'Conflict', statusCode: 409 },
    // Add more predefined errors as needed
  }

  public static FILE_EXTENSION = {
    JSON: '.json',
    YAML: '.yaml',
    YML: '.yml',
  }
}