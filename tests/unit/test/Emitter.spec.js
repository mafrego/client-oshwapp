import Emitter from "@/components/test/Emitter.vue"
import { mount } from "@vue/test-utils"

xdescribe("Emitter", () => {
  it("emits an event with two arguments", () => {
    const wrapper = mount(Emitter)

    wrapper.vm.emitEvent()

    // console.log(wrapper.emitted())
    // console.log(wrapper.emitted().myEvent)
    // console.log(wrapper.emitted().myEvent[0])
    // console.log(wrapper.emitted().myEvent[0][0])

    expect(wrapper.emitted().myEvent[0]).toEqual(["name", "password"])
  })

// useful in situations where you have some heavy processing in lifecycle methods 
// like created and mounted that you don't want to execute
  it("emits an event without mounting the component", () => {
  const events = {}
  const $emit = (event, ...args) => { events[event] = [...args] }

  Emitter.methods.emitEvent.call({ $emit })

  expect(events.myEvent).toEqual(["name", "password"])
})

})
