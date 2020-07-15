import TodoService from '@/services/TodoService'

const state = () => ({
    todos: [],
    filtered:[],
 })

const getters = {
    allTodos: state => state.todos,
    allFiltered: state => state.filtered
 }

const actions = { 
    async fetchTodos({commit}){
        try {
            const response = await TodoService.get()
            commit('setTodos',response.data)
        } catch (error) {
           console.log(error) 
        }
    },
    async addTodo ({commit}, todo){
        try {
            const response = await TodoService.post(todo)
            commit('newTodo', response.data)
        } catch (err) {
            console.log(err)
        }
    },
    async deleteTodo({commit}, id){
        try {
            const response = await TodoService.delete(id)
            if(response.status == 200)
                commit('removeTodo', id)
        } catch (error) {
           console.log(error) 
        }
    },
    async updateTodo({ commit }, updTodo) {
        try {
            const response = await TodoService.put(updTodo.id, updTodo)
            commit('updateTodo', response.data);
        } catch (error) {
            console.log(error)
        }
    },
    async filterTodos({commit}, e){
        commit('filterTodos', e)
    },
    async getAllTodos({commit}){
        commit('getAllTodos')
    }
}

const mutations = {
    setTodos: (state, todos) => {
        state.filtered = []
        state.todos = todos; 
    },
    newTodo: (state, todo) => {
        if(state.filtered.length == 0)
        state.todos.unshift(todo)
        else{
        state.filtered.unshift(todo)
        state.todos.unshift(todo)
        }
    },
    removeTodo: (state, id) => {
         state.filtered = state.filtered.filter(todo => {return todo.uuid !== id});
         state.todos = state.todos.filter(todo => {return todo.uuid !== id});
    },
    updateTodo: (state, updTodo) => {
        const index1 = state.filtered.findIndex(todo => todo.uuid === updTodo.uuid);
        if (index1 !== -1) {
            state.filtered.splice(index1, 1, updTodo);
        }
        const index = state.todos.findIndex(todo => todo.uuid === updTodo.uuid);
        if (index !== -1) {
            state.todos.splice(index, 1, updTodo);
        }
    },
    filterTodos: (state, priority) => {
        state.filtered = state.todos.filter(todo => {return todo.priority == priority});
    },
    getAllTodos: (state) => { 
        state.filtered = []
        state.todos
    }
} 

export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
  }