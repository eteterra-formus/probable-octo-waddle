import { beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

vi.mock('@/api/http', () => ({
    client: { 
        get: vi.fn(),
        request: vi.fn() 
    }
}))

beforeEach(() => {
    vi.clearAllMocks()
    setActivePinia(createPinia())
})
