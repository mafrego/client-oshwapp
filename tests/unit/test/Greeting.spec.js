import { mount } from '@vue/test-utils'
import Greeting from '@/components/test/Greeting.vue'

xdescribe('Greeting.vue', () => {
    it('renders a greeting', () => {
        const wrapper = mount(Greeting)
        expect(wrapper.text()).toMatch("Vue and TDD")

    })
})