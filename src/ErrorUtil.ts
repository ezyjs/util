export class CustomError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly details?: any
  ) {
    super(message)

    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ErrorUtil {
  private static errorDefinitions: { [key: string]: { message: string, statusCode: number } } = {
    VALIDATION_ERROR: { message: 'Validation Error', statusCode: 400 },
    NOT_FOUND: { message: 'Not Found', statusCode: 404 },
    UNAUTHORIZED: { message: 'Unauthorized', statusCode: 401 },
    FORBIDDEN: { message: 'Forbidden', statusCode: 403 },
    INTERNAL_SERVER_ERROR: { message: 'Internal Server Error', statusCode: 500 },
    BAD_REQUEST: { message: 'Bad Request', statusCode: 400 },
    CONFLICT: { message: 'Conflict', statusCode: 409 },
    // Add more predefined errors as needed
  }

  /**
   * 새로운 CustomError를 생성합니다.
   * @param code 에러 코드
   * @param message 에러 메시지 (optional)
   * @param details 추가 세부 정보 (optional)
   */
  static createError(code: string, message?: string, details?: any): CustomError {
    const errorDef = this.errorDefinitions[code]
    if (!errorDef) {
      throw new Error(`Undefined error code: ${code}`)
    }
    const errorMessage = message || errorDef.message
    return new CustomError(code, errorMessage, details)
  }

  static ValidationError(message?: string, details?: any): CustomError {
    return this.createError('VALIDATION_ERROR', message, details)
  }

  static NotFoundError(message?: string, details?: any): CustomError {
    return this.createError('NOT_FOUND', message, details)
  }

  static UnauthorizedError(message?: string, details?: any): CustomError {
    return this.createError('UNAUTHORIZED', message, details)
  }

  static ForbiddenError(message?: string, details?: any): CustomError {
    return this.createError('FORBIDDEN', message, details)
  }

  static InternalServerError(message?: string, details?: any): CustomError {
    return this.createError('INTERNAL_SERVER_ERROR', message, details)
  }

  static BadRequestError(message?: string, details?: any): CustomError {
    return this.createError('BAD_REQUEST', message, details)
  }

  static ConflictError(message?: string, details?: any): CustomError {
    return this.createError('CONFLICT', message, details)
  }

  /**
   * 에러를 로깅합니다.
   * @param error 로깅할 에러
   */
  static logError(error: Error | CustomError): void {
    if (error instanceof CustomError) {
      console.error(`[ERROR: ${error.code}] ${error.message}`, error.details)
    } else {
      console.error(error)
    }
    // Here you could add more sophisticated logging,
    // such as sending errors to a logging service
  }

  /**
   * 에러를 사용자 친화적인 응답으로 변환합니다.
   * @param error 변환할 에러
   */
  static formatErrorResponse(error: Error | CustomError): object {
    if (error instanceof CustomError) {
      return {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details
        }
      }
    } else {
      return {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred'
        }
      }
    }
  }

  /**
   * 에러가 특정 타입인지 확인합니다.
   * @param error 확인할 에러
   * @param code 확인할 에러 코드
   */
  static isErrorType(error: any, code: string): boolean {
    return error instanceof CustomError && error.code === code
  }

  /**
   * 에러를 처리하고 적절한 응답을 반환합니다.
   * @param error 처리할 에러
   */
  static handleError(error: Error | CustomError): { response: object, statusCode: number } {
    this.logError(error)

    const formattedError = this.formatErrorResponse(error)
    let statusCode = 500

    if (error instanceof CustomError) {
      statusCode = this.errorDefinitions[error.code]?.statusCode || 500
    }

    return { response: formattedError, statusCode }
  }

  /**
   * 에러 코드에 해당하는 HTTP 상태 코드를 반환합니다.
   * @param code 에러 코드
   */
  static getHttpStatus(code: string): number {
    return this.errorDefinitions[code]?.statusCode || 500
  }
}