import Vue from "vue"
import { shallowMount, mount, createLocalVue } from "@vue/test-utils"
import VueRouter from "vue-router"
import routes from "./routes.js"
import Vuetify from 'vuetify'
import AtomView from '@/views/Atoms/AtomView.vue'
import Atoms from '@/views/Atoms/Atoms.vue'

// eliminate warnings
Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(VueRouter)

describe("AtomView", () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it("renders a child component via routing", async () => {
    const router = new VueRouter({ routes })
    const wrapper = mount(AtomView, {
      localVue,
      router,
      vuetify,
      stubs: {
        panel: true
      },
      mocks: {
        $store: {
          state: {
            users: {
              isLoggedIn: true,
            },
            route: { params: { atomId: 1 } }
          }
        },
        //workaround to mock async method in mounted 
        methods: {
          show: function (x) { return true }
        }
      }
    })

    router.push("/atms")
    await wrapper.vm.$nextTick()

    // console.log(router.currentRoute)
    expect(wrapper.findComponent(Atoms).exists()).toBe(true)
  })

})
