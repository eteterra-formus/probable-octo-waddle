import { setActivePinia, createPinia } from 'pinia'
import { usePages } from '@/stores/pageStore'
import { client } from '@/api/http'
import { makePage } from '@/__tests__/factories/pages'

const mockedGet = client.get as ReturnType<typeof vi.fn>

describe('page store', () => {
  let store: ReturnType<typeof usePages>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = usePages()

    const validResponse = { status: 200, data: { nodes: [makePage()] } }
    mockedGet.mockResolvedValue(validResponse)
  })

  describe('initially', () => {
    it('is not ready', () => {
      expect(store.state.isReady).toEqual(false)
    })
    it('has no pages', () => {
      expect(store.state.pages).toEqual([])
    })
    it('does not have an error', () => {
      expect(store.state.error).toEqual('')
    })
  })

  describe('when loading some data', () => {
    beforeEach(async () => {
      await store.load()
    })

    it('is ready', () => {
      expect(store.state.isReady).toEqual(true)
    })
    it('has some pages', () => {
      expect(store.state.pages.length).toBeGreaterThan(0)
    })
    it('does not have an error', () => {
      expect(store.state.error).toEqual('')
    })
  })

  describe('when there was a problem loading data', () => {
    beforeEach(async () => {
      const serverError = { status: 500, request: {}, response: {} }
      mockedGet.mockRejectedValue(serverError)

      await store.load()
    })

    it('is ready', () => {
      expect(store.state.isReady).toEqual(true)
    })
    it('has no pages', () => {
      expect(store.state.pages).toEqual([])
    })
    it('has an error', () => {
      expect(store.state.error).toEqual('Unexpected Server Error.')
    })
  })
})
