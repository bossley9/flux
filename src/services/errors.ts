export type GenericError = { message: string }

export type ApiError<T> = {
  response: { data: T }
}

export type AxiosError = { message: string; name: 'AxiosError' }

export type MinifluxError = ApiError<{ error_message: string }>

function isApiError<T>(error: unknown): error is ApiError<T> {
  return (
    error !== null &&
    typeof error === 'object' &&
    'response' in error &&
    error.response !== null &&
    typeof error.response === 'object' &&
    'data' in error.response
  )
}

export function isAxiosError(error: unknown): error is AxiosError {
  return (
    error !== null &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string' &&
    'name' in error &&
    error.name === 'AxiosError'
  )
}

export function isMinifluxError(error: unknown): error is MinifluxError {
  return (
    isApiError(error) &&
    error.response.data !== null &&
    typeof error.response.data === 'object' &&
    'error_message' in error.response.data &&
    typeof error.response.data.error_message === 'string'
  )
}
