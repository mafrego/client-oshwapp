import { mount } from "@vue/test-utils"
import NumberRenderer from "@/components/test/NumberRenderer.vue"

xdescribe("NumberRenderer", () => {
  it("renders even numbers", () => {
    const wrapper = mount(NumberRenderer, {
      propsData: {
        even: true
      }
    })

    expect(wrapper.text()).toBe("2, 4, 6, 8")
  })

  it("renders odd numbers", () => {
  const localThis = { even: false }

  // console.log(NumberRenderer.computed.numbers)
  // console.log(NumberRenderer.computed.numbers.call(localThis))
  // it needs .call() if mount is not used
  expect(NumberRenderer.computed.numbers.call(localThis)).toBe("1, 3, 5, 7, 9")
})

})
