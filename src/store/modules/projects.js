import ProjectService from '@/services/ProjectService'
import AssemblyService from '@/services/AssemblyService'
import AtomService from '@/services/AtomService'
import FileService from '@/services/FileService'

const state = () => ({
    projects: null,
    project: null,
    bom: [],
    atom: null,
    products: [],
    productNames: [],
    assemblableProducts: [],
    root: null,
    assembly: null,
    loading: false,
    error: null,
    errorBom: null,
    dummy: null
})

const getters = {
    getProjects: state => state.projects,
    getProjectNames: state => state.projects.map(node => node.name),
    getProject: state => state.project,
    getBom: state => state.bom,
    getAtom: state => state.atom,
    getAllProducts: state => state.products,
    getAllProductNames: state => state.products.map(product => product.name),
    getAssemblableProducts: state => state.assemblableProducts,
    getAssembly: state => state.assembly,
    getLoading: state => state.loading,
    getError: state => state.error,
    getErrorBom: state => { return state.errorBom }
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
    async createProject({ commit }, project) {
        try {
            commit('setLoading', true)
            const response = await ProjectService.post(project)
            // console.log(response)
            if (response.status == 201) {
                const ret = await ProjectService.index(project.userID)
                commit('setProjects', ret.data)
                return response.status
            }
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
    async updateProjectState({ state, commit }, updates) {
        try {
            commit('setLoading', true)
            const response = await ProjectService.put(updates, state.project.uuid)
            commit('updateState', response.data.state)
            return response.status
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
    // TODO check-refctor to make sure that functions in if block return something
    async sendBom({ state, commit }, formData) {
        try {
            commit('setErrorBom', null)
            commit('setLoading', true)
            const response = await FileService.sendBom(formData, state.project.uuid)
            if (response.status == 201) {
                const ret0 = await ProjectService.put({ state: 'assembling' }, state.project.uuid)
                commit('updateState', ret0.data.state)
                // http 304 instead of 200 that's why I don't get data from actual project
                const ret1 = await ProjectService.getAllProducts(state.project.uuid)
                commit('setProducts', ret1.data)
                // commit('setProductNames', ret1.data)
                const ret2 = await ProjectService.getAssemblableProducts(state.project.uuid)
                commit('setAssemblableProducts', ret2.data)
                const ret3 = await ProjectService.getBom(state.project.uuid)
                commit('setBom', ret3.data)
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
    async deleteBom({ state, commit }) {
        try {
            commit('setLoading', true)
            const response = await ProjectService.deleteBom(state.project.uuid)
            if (response.status === 200) {
                commit('deleteBom')
                const ret = await ProjectService.put({ state: 'created' }, state.project.uuid)
                commit('updateState', ret.data.state)
            }
        } catch (error) {
            commit('setError', error)
        } finally {
            commit('setLoading', false)
        }
    },
    async reviseAtom({ commit }, atom) {
        try {
            commit('setLoading', true)
            const response = await AtomService.put(atom)
            // console.log(response.data)
            commit('updateAtom', response.data)
            return response
        } catch (error) {
            commit('setError', error)
        } finally {
            commit('setLoading', false)
        }
    },
    async fetchAllProducts({ commit }, projectId) {
        try {
            commit('setLoading', true)
            const response = await ProjectService.getAllProducts(projectId)
            commit('setProducts', response.data)
            // commit('setProductNames', response.data)
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
                const retProducts = await ProjectService.getAllProducts(state.project.uuid)
                commit('setProducts', retProducts.data)
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
    async assembleCopy({ state, commit }, assembly) {
        try {
            commit('setLoading', true)
            const response = await AssemblyService.assembleCopy(assembly, state.project.uuid)
            commit('setAssemblableProducts', response.data)
            // if response is the root assembly: the only part left to assemble
            if (response.data.length === 1 && response.data[0].quantity_to_assemble === 1) {
                const ret = await ProjectService.put(
                    { state: 'rooted' },
                    state.project.uuid)
                commit('updateState', ret.data.state)
            }
            if (response.status === 201) {
                const ret = await ProjectService.getAllProducts(state.project.uuid)
                commit('setProducts', ret.data)
                return response.status
            }
        } catch (error) {
            commit('setError', error)
        } finally {
            commit('setLoading', false)
        }
    },
    async disassemble({ state, commit }, assemblyID) {
        try {
            commit('setLoading', true)
            const response = await AssemblyService.disassemble(assemblyID)
            if (response.status === 200) {
                const ret = await ProjectService.getAssemblableProducts(state.project.uuid)
                commit('setAssemblableProducts', ret.data)
                commit('deleteAssembly', assemblyID)
                if (state.project.state === 'rooted') {
                    const ret = await ProjectService.put({ state: 'assembling' }, state.project.uuid)
                    commit('updateState', ret.data.state)
                }
            }
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
    addProject: (state, project) => {
        state.projects.push(project)
    },
    delProject: (state, projectID) => {
        state.bom = []
        state.products = []
        state.productNames = []
        state.project = null
        state.assemblableProducts = []
        state.projects = state.projects.filter(el => { return el.uuid != projectID })
    },
    deleteAssembly: (state, assemblyID) => {
        state.products = state.products.filter(product => product.uuid != assemblyID)
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
    deleteBom: (state) => {
        state.bom = []
        state.products = []
        state.productNames = []
        state.assemblableProducts = []
    },
    setProducts: (state, products) => {
        state.products = products
    },
    setAtom: (state, atom) => {
        state.atom = atom
    },
    updateAtom: (state, atom) => {
        state.atom = atom
        state.bom.forEach((item, i) => { if(item.uuid == atom.uuid) state.bom[i] = atom})
    },
    updateAtomDescription: (state, description) => {
        state.atom.description = description
    },
    setAssemblableProducts: (state, products) => {
        state.assemblableProducts = products
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