import { VueWrapper, mount } from '@vue/test-utils'
import AppListItemVue from '@/components/AppListItem.vue'
import { makePage } from '@/__tests__/factories/pages'
import AppToggleVue from '../AppToggle.vue'

describe('List Item', () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    wrapper = mount(AppListItemVue, { props: { ...makePage({ n: 3 }) } })
  })

  it('is collapsed by default', () => {
    expect(wrapper.findAllComponents(AppListItemVue)).toHaveLength(0)
  })

  describe('when expanded', () => {
    beforeEach(async () => {
      await wrapper.find('.label').trigger('click')
    })

    it('has a down-pointing arrow', async () => {
      expect(wrapper.findComponent(AppToggleVue).props('expand')).toEqual(true)
    })
    it('lists all sub-pages', async () => {
      expect(wrapper.findAllComponents(AppListItemVue)).toHaveLength(3)
    })
    it('collapses on click', async () => {
      await wrapper.find('.label').trigger('click')
      expect(wrapper.findComponent(AppToggleVue).props('expand')).toEqual(false)
      expect(wrapper.findAllComponents(AppListItemVue)).toHaveLength(0)
    })
  })

  describe('when collapsed', () => {
    beforeEach(async () => {
      await wrapper.find('.label').trigger('click') // expand
      await wrapper.find('.label').trigger('click') // collapse again
    })

    it('has a right-pointing arrow', async () => {
      expect(wrapper.findComponent(AppToggleVue).props('expand')).toEqual(false)
    })
    it('does not list sub-pages', async () => {
      expect(wrapper.findAllComponents(AppListItemVue)).toHaveLength(0)
    })
    it('expands again on click', async () => {
      await wrapper.find('.label').trigger('click')
      expect(wrapper.findComponent(AppToggleVue).props('expand')).toEqual(true)
      expect(wrapper.findAllComponents(AppListItemVue)).toHaveLength(3)
    })
  })
})
