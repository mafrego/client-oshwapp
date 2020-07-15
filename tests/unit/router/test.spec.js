import { shallowMount, mount, createLocalVue } from "@vue/test-utils"
import App from "@/components/test/App.vue"
import VueRouter from "vue-router"
import NestedRoute from "@/components/test/NestedRoute.vue"
import routes from './routes.js'

const localVue = createLocalVue()
localVue.use(VueRouter)

xdescribe("App", () => {
 it("renders a child component via routing", async () => {
    const router = new VueRouter({routes})
    const wrapper = mount(App, { 
      localVue,
      router
    })

    router.push("/nested-route")
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(NestedRoute).exists()).toBe(true)
  })

  
  it("should have a different route that /nested-route", async () => {
    const router = new VueRouter({ routes })
    const wrapper = mount(App, { 
      localVue,
      router
    })
    console.log(router.currentRoute)
    // This test will fail because we are still on the /nested-route
    expect(wrapper.findComponent(NestedRoute).exists()).toBe(false)
  })
  
})
