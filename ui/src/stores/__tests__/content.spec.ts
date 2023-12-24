import { setActivePinia, createPinia } from "pinia"
import { useContent } from "@/stores/content"

describe('content store', () => {
    let store: ReturnType<typeof useContent>

    beforeEach(() => {
        setActivePinia(createPinia())
        store = useContent()
    })
    
    describe('initially', () => {
        it('is not ready', () => {
            expect(store.state.isReady).toEqual(false)
        })
        it('has no nodes', () => {
            expect(store.state.nodes).toEqual([])
        })
    })

    describe('after loading some data', () => {
        beforeEach(async () => {
            await store.load()
        })

        it('is ready', () => {
            expect(store.state.isReady).toEqual(true)
        })
        it('has some nodes', () => {
            expect(store.state.nodes.length).toBeGreaterThan(0)
        })
    })
})
