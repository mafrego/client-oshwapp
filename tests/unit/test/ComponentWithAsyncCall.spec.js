import { shallowMount, mount } from '@vue/test-utils'
import ParentWithAPICallChild from '@/components/test/ParentWithAPICallChild.vue'
import ComponentWithAsyncCall from '@/components/test/ComponentWithAsyncCall.vue'

xdescribe('ParentWithAPICallChild.vue', () => {
    it('renders with mount and does initialize API call', () => {
        const wrapper = mount(ParentWithAPICallChild)

        expect(wrapper.findComponent(ComponentWithAsyncCall).exists()).toBe(true)
    })

    it('renders with mount and does initialize API call stubbing child component', () => {
        const wrapper = mount(ParentWithAPICallChild, {
            stubs: {
                ComponentWithAsyncCall: true
            }
        })

        expect(wrapper.findComponent(ComponentWithAsyncCall).exists()).toBe(true)
    })

    it('renders with shallowMount and does not initialize API call', () => {
        const wrapper = shallowMount(ParentWithAPICallChild)

        expect(wrapper.findComponent(ComponentWithAsyncCall).exists()).toBe(true)
    })


})
