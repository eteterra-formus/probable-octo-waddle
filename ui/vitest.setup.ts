import { beforeEach, vi } from 'vitest'

vi.mock('@/api/http', () => ({
    client: { get: vi.fn() }
}))

beforeEach(() => {
    vi.clearAllMocks()
})
