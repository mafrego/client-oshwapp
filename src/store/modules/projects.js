import ProjectService from '@/services/ProjectService'
import AssemblyService from '@/services/AssemblyService'
import FileService from '@/services/FileService'

const state = () => ({
    projects: null,
    project: null,
    bom: [],
    assemblableProducts: [],
    root: null,
    assembly: null,
    loading: false,
    error: null,
    errorBom: null
})

//  TODO implement getters properly see vuex getters
const getters = {
    getProjects: state => state.projects,
    getProject: state => state.project,
    getBom: state => state.bom,
    getAssemblableProducts: state => state.assemblableProducts,
    getAssembly: state => state.assembly,
    getLoading: state => state.loading,
    getError: state => state.error,
    getErrorBom: state => { return state.errorBom}
}

const actions = {
    async fetchProjects({ commit }, userID) {
        try {
            commit('setLoading', true)
            const response = await ProjectService.index(userID)
            commit('setProjects', response.data)
        } catch (error) {
            commit('setError', error)
        } finally {
            commit('setLoading', false)
        }
    },
    async fetchProject({ commit }, projectID) {
        try {
            commit('setLoading', true)
            const response = await ProjectService.show(projectID)
            commit('setProject', response.data)
        } catch (error) {
            commit('setError', error)
        } finally {
            commit('setLoading', false)
        }
    },
    async updateProjectState({ commit }, project) {
        try {
            commit('setLoading', true)
            const response = await ProjectService.put(project, project.uuid)
            commit('updateState', response.data.state)
        } catch (error) {
            commit('setError', error)
        } finally {
            commit('setLoading', false)
        }
    },
    async sendBom({ state, commit }, formData) {
        try {
            commit('setErrorBom', null)
            commit('setLoading', true)
            const response = await FileService.sendBom(formData, state.project.uuid)
            // not working properly because of async functions
            if (response.status == 201) {
                const newstate = 'assembling'
                commit('updateState', newstate)
                const retBom = await ProjectService.getBom(state.project.uuid)
                commit('setBom', retBom.data)
                const retAssemblbales = await ProjectService.getAssemblableProducts(state.project.uuid)
                commit('setAssemblableProducts', retAssemblbales.data)
            }
        } catch (error) {
            commit('setErrorBom', error.response.data)
        } finally {
            commit('setLoading', false)
        }
    },
    async fetchBom({ commit }, projectId) {
        try {
            commit('setLoading', true)
            const response = await ProjectService.getBom(projectId)
            commit('setBom', response.data)
        } catch (error) {
            commit('setError', error)
        } finally {
            commit('setLoading', false)
        }
    },
    async uploadImages({ state, commit }, formData) {
        try {
            commit('setLoading', true)
            const response = await FileService.uploadImages(formData, state.project.uuid)
            // not working properly because of async functions
            if (response.status == 201) {
                const retBom = await ProjectService.getBom(state.project.uuid)
                commit('setBom', retBom.data)
                const retAssemblbales = await ProjectService.getAssemblableProducts(state.project.uuid)
                commit('setAssemblableProducts', retAssemblbales.data)
            }
            return response
        } catch (error) {
            commit('setError', error)
        } finally {
            commit('setLoading', false)
        }
    },
    async fetchAssemblableProducts({ commit }, projectId) {
        try {
            commit('setLoading', true)
            const response = await ProjectService.getAssemblableProducts(projectId)
            commit('setAssemblableProducts', response.data)
        } catch (error) {
            commit('setError', error)
        } finally {
            commit('setLoading', false)
        }
    },
    async deleteProject({ commit }, projectId) {
        try {
            commit('setLoading', true)
            await ProjectService.delete(projectId)
            commit('delProject', projectId)
        } catch (error) {
            commit('setError', error)
        } finally {
            commit('setLoading', false)
        }
    },
    async assemble({ state, commit }, assembly) {
        try {
            commit('setLoading', true)
            const projectId = state.project.uuid
            const response = await AssemblyService.assemble(assembly, projectId)
            commit('setAssemblableProducts', response.data)
            return true
        } catch (error) {
            commit('setError', error)
        } finally {
            commit('setLoading', false)
        }
    }
}

const mutations = {
    setProjects: (state, projects) => {
        state.projects = projects
    },
    setProject: (state, projectID) => {
        state.project = state.projects.find(el => el.uuid === projectID)
    },
    uploadBom: (state, project) => {
        state.project = project
    },
    updateState: (state, projectState) => {
        state.project.state = projectState
    },
    setBom: (state, bom) => {
        state.bom = bom
    },
    setAssemblableProducts: (state, products) => {
        state.assemblableProducts = products
    },
    delProject: (state, projectID) => {
        state.bom = []
        state.project = null
        state.assemblableProducts = []
        state.projects = state.projects.filter(el => { return el.uuid != projectID })
    },
    setError: (state, error) => {
        state.error = error
    },
    setErrorBom: (state, error) => {
        state.errorBom = error
    },
    setLoading: (state, value) => {
        state.loading = value
    }
}

export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
}