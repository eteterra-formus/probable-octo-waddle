import { client } from '@/api/http'
import type { AxiosError } from 'axios'
import { isPageTree, type Page, type PageTree } from '@/types/content'

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
      if (result.data.nodes === undefined) {
        throw new BadResponseData('page data is missing')
      }

      const pageTree = { pages: result.data.nodes }

      if (!isPageTree(pageTree)) {
        throw new BadResponseData('page data is invalid')
      }

      return pageTree
    })
    .catch((error: AxiosError): Problem => {
      console.error(error.message, error)
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
