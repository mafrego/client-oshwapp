import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

xdescribe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'OSHW APP'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
