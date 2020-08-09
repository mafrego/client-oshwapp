<template>
  <v-container fluid>
    <v-btn @click="toggle">projects</v-btn>
    <div v-if="isOpen">
      <div v-for="project in projects" :key="project.uuid">
        {{project.name}}: {{project.uuid}}
        <v-btn @click="delProject(project.uuid)" color="red">delete</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import AdminService from "@/services/AdminService.js";

export default {
  name: "AdminBoardProjects",
  data() {
    return {
      projects: [],
      isOpen: false,
    };
  },
  methods: {
    toggle: function () {
      this.isOpen = !this.isOpen;
    },
    async delProject(projectID) {
      const ret = await AdminService.deleteProject(projectID);
      if (ret.status === 200) {
        this.projects = (await AdminService.getAllProjects()).data;
      }
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