import ProjectService from '@/services/ProjectService'
import AssemblyService from '@/services/AssemblyService'
import AtomService from '@/services/AtomService'
import FileService from '@/services/FileService'

const state = () => ({
    projects: [],
    project: null,
    bom: [],
    atom: null,
    assembly: null,
    products: [],
    assemblies: [],
    productNames: [],
    assemblableProducts: [],
    root: null,
    loading: false,
    error: null,
    errorBom: null,
    dummy: null
})

const getters = {
    getProjects: state => state.projects,
    getProjectNames: state => state.projects.map(node => node.name),
    getProject: state => state.project,
    getProjectByID: (state) => (id) => {
        return state.projects.find(project => project.uuid === id)
    },
    getBom: state => state.bom,
    getAtom: state => state.atom,
    getAtomNames: state => state.bom.map(atom => atom.name),
    getAllProducts: state => state.products,
    getAllProductNames: state => state.products.map(product => product.name),
    getAssemblies: state => state.assemblies,
    getAssembliesNames: state => state.assemblies.map(assembly => assembly.name),
    getAssemblyCounter: state => Math.max(...state.assemblies.map(assembly => assembly.itemNumber), 0),
    getAssemblableProducts: state => state.assemblableProducts,
    getAssembly: state => state.assembly,
    getLoading: state => state.loading,
    getError: state => state.error,
    getErrorBom: state => { return state.errorBom },
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

    createProject({ commit }, project) {
        commit('addProject', project)
    },

    // projectState is an object like this { state: 'newstate'}
    async updateProjectState({ state, commit }, projectState) {
        try {
            commit('setLoading', true)
            const response = await ProjectService.updateProjectState(projectState, state.project.uuid)
            commit('updateState', response.data.project.state)
            return response.status
        } catch (error) {
            commit('setError', error)
        } finally {
            commit('setLoading', false)
        }
    },
    updateProject({ commit }, project) {
        commit('setProject', project)
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
    // example of how to manage errors in actions
    // TODO refactor using dispatch
    async sendBom({ state, commit }, formData) {
        try {
            commit('setErrorBom', null)
            commit('setLoading', true)
            const response = await FileService.sendBom(formData, state.project.uuid)
            if (response.status == 201) {
                const ret0 = await ProjectService.updateProjectState({ state: 'assembling' }, state.project.uuid)
                commit('updateProject', ret0.data.project)
                const ret3 = await ProjectService.getBom(state.project.uuid)
                commit('setBom', ret3.data)
                // I keep the following line just to remind you that if you make multiple commits with the same
                // data (ret3.data) the assignments will refer to the same data, that is if modify bom you'll modify 
                // products simultaneously!
                // commit('setProducts', ret3.data)
            }
        } catch (error) {
            commit('setErrorBom', error.response.data)
        } finally {
            commit('setLoading', false)
        }
    },
    async fetchBom({ commit, state }) {
        try {
            commit('setLoading', true)
            const response = await ProjectService.getBom(state.project.uuid)
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
            commit('deleteBom', response.data)
        } catch (error) {
            commit('setError', error)
        } finally {
            commit('setLoading', false)
        }
    },
    createAtom({ commit }, atom) {
        commit('addAtomToBom', atom)
        commit('addProduct', atom)
        commit('addAssemblableProduct', atom)
    },
    reviseAtom({ dispatch }) {
        dispatch('fetchAssemblableProducts')
        dispatch('fetchBom')
        dispatch('fetchAllProducts')
    },
    async deleteAtom({ commit, state }, atomID) {
        try {
            commit('setLoading', true)
            const response = await AtomService.delete(atomID)
            commit('deleteAtom', response.data)
            if (response && state.bom.length < 1) {
                // TODO try to use: dispatch('updateProjectState', { state: 'created'})
                const ret = await ProjectService.updateProjectState({ state: 'created' }, state.project.uuid)
                commit('updateState', ret.data.project.state)
            }
        } catch (error) {
            commit('setError', error)
        } finally {
            commit('setLoading', false)
        }
    },
    async fetchAllProducts({ commit, state }) {
        try {
            commit('setLoading', true)
            const response = await ProjectService.getAllProducts(state.project.uuid)
            commit('setProducts', response.data)
        } catch (error) {
            commit('setError', error)
        } finally {
            commit('setLoading', false)
        }
    },
    async fetchAssemblies({ commit, state }) {
        try {
            commit('setLoading', true)
            const response = await ProjectService.getAssemblies(state.project.uuid)
            commit('setAssemblies', response.data)
        } catch (error) {
            commit('setError', error)
        } finally {
            commit('setLoading', false)
        }
    },
    // TODO refactor: I think that there's no point in re-fetching data from db, not sure
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
    async fetchAssemblableProducts({ commit, state }) {
        try {
            commit('setLoading', true)
            const response = await ProjectService.getAssemblableProducts(state.project.uuid)
            commit('setAssemblableProducts', response.data)
        } catch (error) {
            commit('setError', error)
        } finally {
            commit('setLoading', false)
        }
    },
    assembleCopy({dispatch, commit}, assemblableProducts){
        commit('setAssemblableProducts', assemblableProducts)
        dispatch('fetchAssemblies')
        dispatch('fetchBom')
    },
    reviseAssembly({ dispatch }) {
        dispatch('fetchAssemblableProducts')
        dispatch('fetchAssemblies')
    },
    // TODO refactor using dispatch
    async disassemble({ state, commit }, assemblyID) {
        try {
            commit('setLoading', true)
            const response = await AssemblyService.disassemble(assemblyID)
            if (response.status === 200) {
                const ret = await ProjectService.getAssemblableProducts(state.project.uuid)
                commit('setAssemblableProducts', ret.data)
                commit('deleteAssembly', assemblyID)
                const ret0 = await ProjectService.getBom(state.project.uuid)
                commit('setBom', ret0.data)
                if (state.project.state === 'rooted') {
                    const ret = await ProjectService.updateProjectState({ state: 'assembling' }, state.project.uuid)
                    commit('updateState', ret.data.project.state)
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
    setProject: (state, project) => {
        state.project = project
    },
    addProject: (state, project) => {
        state.project = project
        state.projects.unshift(project)
    },
    updateProject: (state, project) => {
        state.project = project
    },
    updateProjectDescription: (state, description) => {
        state.project.description = description
    },
    updateProjectVersion: (state, version) => {
        state.project.version = version
    },
    updateProjectCurrency: (state, currency) => {
        state.project.currency = currency
    },
    updateProjectLicense: (state, license) => {
        state.project.license = license
    },
    updateProjectCountry: (state, country) => {
        state.project.country = country
    },
    updateProjectRegion: (state, region) => {
        state.project.region = region
    },
    updateProjectLink: (state, link) => {
        state.project.link = link
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
        state.assemblies = state.assemblies.filter(assembly => assembly.uuid != assemblyID)
    },
    addAtomToBom: (state, atom) => {
        state.bom.push(atom)     // add at the end of array
    },
    updateState: (state, projectState) => {
        state.project.state = projectState
    },
    setBom: (state, bom) => {
        bom.sort((a, b) => a.itemNumber > b.itemNumber ? 1 : b.itemNumber > a.itemNumber ? -1 : 0)
        state.bom = bom
    },
    deleteBom: (state, project) => {
        state.project.state = project.state
        state.bom = []
        state.products = []
        state.productNames = []
        state.assemblableProducts = []
    },
    setProducts: (state, products) => {
        products.sort((a, b) => a.itemNumber > b.itemNumber ? 1 : b.itemNumber > a.itemNumber ? -1 : 0)
        state.products = products
    },
    addProduct: (state, product) => {
        state.products.push(product)
    },
    setAssemblies: (state, assemblies) => {
        assemblies.sort((a, b) => a.itemNumber > b.itemNumber ? 1 : b.itemNumber > a.itemNumber ? -1 : 0)
        state.assemblies = assemblies
    },
    setAtom: (state, atom) => {
        state.atom = atom
    },
    updateAtom: (state, atom) => {
        // state.atom = atom
        state.bom.forEach((item, i) => { if (item.uuid == atom.uuid) state.bom[i] = atom })
        state.products.forEach((item, i) => { if (item.uuid == atom.uuid) state.bom[i] = atom })
    },
    deleteAtom: (state, atom) => {
        state.bom = state.bom.filter(item => { return item.uuid != atom.uuid })
        state.products = state.products.filter(item => { return item.uuid != atom.uuid })
        state.assemblies = state.assemblies.filter(item => { return item.uuid != atom.uuid })
        state.assemblableProducts = state.assemblableProducts.filter(item => { return item.uuid != atom.uuid })
        state.productNames = state.productNames.filter(item => { return item != atom.name })
    },
    updateAtomDescription: (state, description) => {
        state.atom.description = description
    },
    updateAtomQuantity: (state, quantity) => {
        state.atom.quantity = quantity
    },
    updateAtomQuantityToAssemble: (state, new_qty_to_assemble) => {
        state.atom.quantity = state.atom.quantity + (new_qty_to_assemble - state.atom.quantity_to_assemble)
        state.atom.quantity_to_assemble = new_qty_to_assemble
    },
    updateAtomUnitCost: (state, cost) => {
        state.atom.unitCost = cost
    },
    updateAtomCurrency: (state, currency) => {
        state.atom.currency = currency
    },
    updateAtomLink: (state, link) => {
        state.atom.link = link
    },
    updateAtomGTIN: (state, GTIN) => {
        state.atom.GTIN = GTIN
    },
    updateAtomSKU: (state, SKU) => {
        state.atom.SKU = SKU
    },
    updateAtomVendorURL: (state, vendorUrl) => {
        state.atom.vendorUrl = vendorUrl
    },
    updateAtomMOQ: (state, moq) => {
        state.atom.moq = moq
    },
    updateAtomLeadTime: (state, leadTime) => {
        state.atom.leadTime = leadTime
    },
    updateAtomMaterial: (state, material) => {
        state.atom.material = material
    },
    updateAtomWeight: (state, weight) => {
        state.atom.weight = weight
    },
    updateAtomNotes: (state, notes) => {
        state.atom.notes = notes
    },
    setAssembly: (state, assembly) => {
        state.assembly = assembly
    },
    updateAssemblyDescription: (state, description) => {
        state.assembly.description = description
    },
    updateAssemblyInstruction: (state, instruction) => {
        state.assembly.instruction = instruction
    },
    updateAssemblyLink: (state, link) => {
        state.assembly.link = link
    },
    setAssemblableProducts: (state, products) => {
        products.sort((a, b) => a.itemNumber > b.itemNumber ? 1 : b.itemNumber > a.itemNumber ? -1 : 0)
        state.assemblableProducts = products
    },
    addAssemblableProduct: (state, product) => {
        state.assemblableProducts.push(product)
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