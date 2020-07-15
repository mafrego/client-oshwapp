import Vuex from "vuex"
import Vue from "vue"
import { mount, createLocalVue } from "@vue/test-utils"
import TodosList from "@/views/Todos/TodosList.vue"
import Vuetify from 'vuetify'

// eliminate warnings
Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
    state: {
        todos: [{ title: 'a', description: 'ciao' }, { title: 'b', description: 'boh' }],
        filtered: []
    },
    getters: {
        allTodos: state => state.todos,
        allFiltered: state => state.filtered
    },
    actions: {
        async fetchTodos({ commit }) {
            try {
                console.log(commit)
            } catch (error) {
                console.log(error)
            }
        }
    }
})

xdescribe("TodosList", () => {
    it("renders a username using a real Vuex store", () => {
        const wrapper = mount(TodosList, {
            store,
            localVue
        })

        expect(wrapper.find(".todo").text().includes('a')).toBe(true)
    })

})
