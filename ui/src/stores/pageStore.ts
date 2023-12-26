import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { getPages } from '@/api/pagesResource'
import type { Page } from '@/types/content'

export interface PageStore {
  isReady: boolean
  error: string
  pages: Page[]
}

export const initialState = {
  isReady: false,
  error: '',
  pages: []
}

export const usePages = defineStore('pages', () => {
  const state = reactive<PageStore>(initialState)

  async function load() {
    const result = await getPages()

    if ('pages' in result) {
      state.pages = result.pages
      state.error = ''
    } else {
      state.pages = []
      state.error = result.details
    }

    state.isReady = true
  }

  return { state, load }
})
