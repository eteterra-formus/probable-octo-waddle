import { client } from '@/api/http'
import type { AxiosError } from 'axios'
import type { Page, PageTree } from '@/types/content'

export interface GetPagesResponse {
  nodes: Page[]
}

export interface Problem {
  details: string
}

class BadResponseData extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * @returns either a PageTree, or a Problem. 
 * 
 * does not raise an error.
 * 
 * both outcomes must be handled by the caller 
 * using pattern matching on the return object.
 */
export const getPages = () =>
  client
    .get<GetPagesResponse>('/pages')
    .then((result): PageTree => {
      // check that pages are really valid
      if (result.data.nodes === undefined) {
        throw new BadResponseData('page data is missing')
      }
      return { pages: result.data.nodes }
    })
    .catch((error: AxiosError): Problem => {
      if (error.name === 'BadResponseData') {
        return { details: `Bad Response: ${error.message}.` }
      } else if (error.response) {
        return { details: 'Unexpected Server Error.' }
      } else if (error.request) {
        return { details: 'Server did not respond.' }
      } else {
        return { details: 'Could not send request to server.' }
      }
    })
