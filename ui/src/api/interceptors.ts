import type { AxiosError, AxiosRequestConfig } from 'axios'
import { client } from './http'

export interface RequestConfigWithRetry extends AxiosRequestConfig {
  retryAttempt?: number
}

export const retryOnError = (error: AxiosError) => {
  const config = error.config as RequestConfigWithRetry
  config.retryAttempt ??= 0

  if (config.retryAttempt === 3) {
    return Promise.reject(error)
  } else {
    config.retryAttempt += 1
  }

  const delay = config.retryAttempt * 1000

  setTimeout(() => {
    return client.request(config)
  }, delay)
}
