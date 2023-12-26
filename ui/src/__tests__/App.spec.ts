import { mount, flushPromises } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import App from '@/App.vue'
import { makePage } from './factories/pages'
import AppListItemVue from '@/components/AppListItem.vue'
import { usePages } from '@/stores/pageStore'

describe('Page Tree App', () => {
  it('shows loading message', async () => {
    const app = mount(App, { global: { plugins: [createTestingPinia()] } })
    expect(app.text()).toContain('loading..')
  })

  it('encountered a problem loading data', async () => {
    const app = mount(App, { global: { plugins: [createTestingPinia()] } })
    usePages().$patch({ state: { isReady: true, error: 'Ooops', pages: [] } })
    await flushPromises()
    expect(app.text()).toContain('Ooops')
  })

  it('did not get any data from the api', async () => {
    const app = mount(App, { global: { plugins: [createTestingPinia()] } })
    usePages().$patch({ state: { isReady: true, error: '', pages: [] } })
    await flushPromises()
    expect(app.text()).toContain('Sorry, no pages to display')
  })

  it('shows a page tree', async () => {
    const app = mount(App, { global: { plugins: [createTestingPinia()] } })
    usePages().$patch({ state: { isReady: true, error: '', pages: [makePage({ n: 5 })] } })
    await flushPromises()
    expect(app.findAllComponents(AppListItemVue)).toHaveLength(6)
  })
})
