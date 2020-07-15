import flushPromises from "flush-promises"
import { shallowMount, mount } from "@vue/test-utils"
import FormSubmitter from "@/components/test/FormSubmitter.vue"

let url = ''
let data = ''

const mockHttp = {
    get: (_url, _data) => {
        return new Promise((resolve, reject) => {
            url = _url
            data = _data
            resolve()
        })
    }
}


xdescribe("FormSubmitter", () => {
    it("reveals a notification when submitted", async () => {
        // ARRANGE
        const wrapper = shallowMount(FormSubmitter)
        // ACT
        wrapper.find("[data-username]").setValue("alice")
        // wrapper.find("form").trigger("submit.prevent")
        // await wrapper.vm.$nextTick()

        // same as above but shorter without vm.$nextTick()
        const form = wrapper.find('form')
        await form.trigger('submit.prevent')
        // ASSERT
        expect(wrapper.find(".message").text())
            .toBe("Thank you for your submission, alice.")
    })

    it("reveals a notification when submitted with mock", async () => {
        const wrapper = mount(FormSubmitter, {
            data() {
                return {
                    asyncTest: true
                }
            },
            // instead of using whatever real http library is attached to Vue.prototype.$http, 
            // see the relative component (in this case FormSubmitter.vue)
            // the mock implementation will be used instead.
            mocks: {
                $http: mockHttp
            }
        })

        wrapper.find("[data-username]").setValue("alice")
        wrapper.find("form").trigger("submit.prevent")

        await flushPromises()

        expect(wrapper.find(".message").text())
            .toBe("Thank you for your submission, alice.")
        expect(url).toBe("/api/v1/register")
        expect(data).toEqual({ username: "alice" })
    })
})

