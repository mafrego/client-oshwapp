<template>
  <v-container fluid>
    <v-btn @click="toggle">download project bop</v-btn>
    <div v-if="isOpen">
      <div v-for="project in projects" :key="project.uuid">
        {{project.name}}: {{project.uuid}}
        <v-btn @click="download(project)" color="blue">download BOP</v-btn>
      </div>
    </div>
    <div>
      <a v-if="updatedBopUrl" :href="updatedBopUrl" download>updated BOP</a>
    </div>
  </v-container>
</template>

<script>
// TODO use vuex to sync projects when cruded in other components
import AdminService from "@/services/AdminService.js";

export default {
  name: "AdminBoardDownloadBop",
  data() {
    return {
      projects: [],
      isOpen: false,
      updatedBopUrl: ""
    };
  },
  methods: {
    toggle: function () {
      this.isOpen = !this.isOpen;
    },
    async download(project) {
      const data = {
        uuid: project.uuid,
        name: project.name,
      }
      const ret = await AdminService.downloadProjectBop(data);
      console.log('ret:', ret)
      this.updatedBopUrl = ret.data.Location
    },
  },
  async created() {
    try {
      this.projects = (await AdminService.getAllProjects()).data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
</style>