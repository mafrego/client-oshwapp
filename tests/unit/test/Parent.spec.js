import { mount } from "@vue/test-utils"
import Parent from "@/components/test/Parent.vue"
import Child from "@/components/test/Child.vue"
import Son from "@/components/test/Son.vue"

xdescribe("Parent", () => {
  it("does not render a span", () => {
    const wrapper = mount(Parent)

    // console.log(wrapper.find('span').html())
    // console.log(wrapper.find('span').text())
    // console.log(wrapper.find('span').exists())
    // console.log(wrapper.find('style'))
    // console.log(wrapper.find('span').attributes('style'))
    expect(wrapper.find('span').attributes('style')).toBe("display: none;")
  })

  // it does render the Child component even if showSpan is set to false
  it("does not render a Child component", () => {
    const wrapper = mount(Parent, {
      data() {
        return { showSpan: false }
      }
    })

    expect(wrapper.findComponent(Child).exists()).toBe(true)
  })

  it("does render a span", () => {
    const wrapper = mount(Parent, {
      data() {
        return { showSpan: true }
      }
    })

    // console.log(wrapper.find('span').html())
    // console.log(wrapper.find('span').text())
    // console.log(wrapper.find('style'))
    expect(wrapper.find('span').text()).toBe('Parent Component')
  })

  it("renders a Child component", () => {
  const wrapper = mount(Parent, {
    data() {
      return { showChild: true }
    }
  })

  expect(wrapper.findComponent({ name: "Child" }).exists()).toBe(true)
})


it("renders many children", () => {
  const wrapper = mount(Parent)

  expect(wrapper.findAllComponents(Son).length).toBe(3)
})

})
