import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { loadPageTree, type ContentNode } from '@/api/content'

export interface ContentStoreState {
    isReady: boolean
    nodes: ContentNode[]
}

export const useContent = defineStore('content', () => {
    const state = reactive<ContentStoreState>({ 
        isReady: false, 
        nodes: [] 
    })
    
    async function load() {
        const { nodes } = await loadPageTree()
        state.nodes = nodes
        state.isReady = true
    }

    return { state, load }
})
