import { makePage } from '@/__tests__/factories/pages'
import { isPage, isPageTree } from '@/types/content'

describe('is page tree', () => {
  describe('with an invalid page tree', () => {
    it('returns false', () => {
      expect(isPageTree({ foo: 'bar' })).toBe(false)
    })
  })

  describe('with a valid page tree', () => {
    it('returns true', () => {
      expect(isPageTree({ pages: [] })).toBe(true)
      expect(isPageTree({ pages: [makePage({})] })).toBe(true)
      expect(isPageTree({ pages: [makePage({ n: 2 })] })).toBe(true)
    })
  })
})

describe('is page', () => {
  describe('with an invalid top-level page', () => {
    it('returns false', () => {
      expect(isPage({ id: 1, name: 'foo' })).toBe(false)
      expect(isPage({ id: '', name: 'foo' })).toBe(false)
      expect(isPage({ id: '1' })).toBe(false)
      expect(isPage({ id: '1', name: '' })).toBe(false)
    })
  })

  describe('with a valid top-level page', () => {
    it('returns true', () => {
      expect(isPage(makePage({}))).toBe(true)
    })
  })

  describe('with an invalid page in the tree somewhere', () => {
    it('returns false', () => {
      const invalidPageSomewhere = makePage({ n: 3 })
      invalidPageSomewhere.children![0].children?.push({ foo: 'bar' } as any)
      expect(isPage(invalidPageSomewhere)).toBe(false)
    })
  })
})
