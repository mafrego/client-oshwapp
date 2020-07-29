import ProjectService from '@/services/ProjectService'

const state = () => ({
    projects: null,
    project: null,
    bom: [],
    workingProducts:[],
    root: null
 })

const getters = {
    getProjects: state => state.projects,
    getProject: state => state.project,
    getBom: state => state.bom,
    getWorkingProfucts: state => state.workingProducts
 }

const actions = { 
    async fetchProjects({commit},userID){
        try {
            const response = await ProjectService.index(userID)
            commit('setProjects',response.data)
        } catch (error) {
           console.log(error) 
        }
    },
    async fetchProject({commit},projectID){
        try {
            const response = await ProjectService.show(projectID)
            commit('setProject',response.data)
        } catch (error) {
           console.log(error) 
        }
    },
    async fetchBom({commit}, projectId){
        try {
            const response = await ProjectService.getBom(projectId)
            commit('setBom',response.data)
        } catch (error) {
           console.log(error) 
        }
    },
}

const mutations = {
    setProjects: (state, projects) => {
        state.projects = projects
    },
    setProject: (state, projectID) => {
        state.project = state.projects.find(el => el.uuid === projectID)
    },
    setBom: (state, bom) => {
        state.bom = bom
    },
} 

export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
  }