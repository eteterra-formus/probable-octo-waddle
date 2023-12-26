import * as http from '@/api/http'
import { retryOnError, type RequestConfigWithRetry } from '@/api/interceptors'
import type { AxiosError } from 'axios'

const mockedRequest = http.client.request as ReturnType<typeof vi.fn>

describe('http client', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('when a request is not successful at first', () => {
    it('is retried', () => {
      retryOnError({ config: {} } as AxiosError)
      vi.runAllTimers()
      expect(mockedRequest).toHaveBeenCalledTimes(1)
    })
  })

  describe('when a request is not successful three times in a row', () => {
    it('is not retried again', () => {
      const config = { retryAttempt: 3 } as RequestConfigWithRetry
      expect(retryOnError({ config } as AxiosError)).rejects.toEqual({ config })
      vi.runAllTimers()
      expect(mockedRequest).toHaveBeenCalledTimes(0)
    })
  })
})
