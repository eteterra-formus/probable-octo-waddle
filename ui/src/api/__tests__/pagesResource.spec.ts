import type { AxiosError, AxiosResponse } from 'axios'
import * as http from '@/api/http'
import { getPages, type Problem } from '@/api/pagesResource'
import type { PageTree } from '@/types/content'
import { makePage } from '@/__tests__/factories/pages'

const mockedGet = http.client.get as ReturnType<typeof vi.fn>

describe('pages resource', () => {
  describe('get pages action', () => {
    describe('when the request is successful', () => {
      it('returns a page tree', async () => {
        const validResponse = { status: 200, data: { nodes: [makePage({ n: 3 }), makePage({})] } }
        mockedGet.mockResolvedValue(validResponse)
        const result = (await getPages()) as PageTree
        expect(result).toMatchObject({
          pages: expect.any(Array)
        })
      })
    })

    describe('when there is an unexpected response status', () => {
      it('becomes a problem', async () => {
        mockedGet.mockRejectedValue({
          response: { status: 500, statusText: 'SERVER ERROR' }
        } as AxiosError)
        const response = (await getPages()) as Problem
        expect(response.details).toEqual('Unexpected Server Error.')
      })
    })

    describe('when page data is missing from response', () => {
      it('becomes a problem', async () => {
        mockedGet.mockResolvedValue({ data: { foo: 'bar' } } as AxiosResponse)
        const response = (await getPages()) as Problem
        expect(response.details).toEqual('Bad Response: page data is missing.')
      })
    })

    describe('when page data in response is invalid', () => {
      it('becomes a problem', async () => {
        const invalidPageTree = [{ foo: 'bar' }]
        mockedGet.mockResolvedValue({ data: { nodes: invalidPageTree } } as AxiosResponse)
        const response = (await getPages()) as Problem
        expect(response.details).toEqual('Bad Response: page data is invalid.')
      })
    })
  })

  describe('when no response was received', () => {
    it('returns an error', async () => {
      mockedGet.mockRejectedValue({ request: {} } as AxiosResponse)
      const response = (await getPages()) as Problem
      expect(response.details).toEqual('Server did not respond.')
    })
  })

  describe('when the request could not be sent', () => {
    it('becomes a problem', async () => {
      mockedGet.mockRejectedValue({} as AxiosResponse)
      const response = (await getPages()) as Problem
      expect(response.details).toEqual('Could not send request to server.')
    })
  })
})
