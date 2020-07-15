import { shallowMount } from '@vue/test-utils'
import Blank from '@/components/Blank.vue'

xdescribe('Blank.vue', () => {
  
  xit('gives empty string', () => {
    const wrapper = shallowMount(Blank)
    expect(wrapper.html()).toContain('')
  })
})