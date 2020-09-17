<template>
  <div>
    <v-btn :to="{ name: 'adminboard'}" color="blue">admin board</v-btn>
    <br>
    <ul>
      <li v-for="(value, name, index) in user" :key="index">{{name}}: {{value}}</li>
    </ul>
    <br />
    <ul>
      Projects:
      <li v-for="(project, index) in projects" :key="index">
        {{project.name}}: {{project.uuid}}
        <v-btn @click="delProject(project.uuid)" color="red">delete</v-btn>
      </li>
    </ul>
  </div>
</template>

<script>
import AdminService from "@/services/AdminService.js";

export default {
  name: "AdminUser",
  data() {
    return {
      user: {},
      projects: [],
    };
  },
  methods: {
    async delProject(projectID) {
      const ret = await AdminService.deleteProject(projectID);
      if (ret.status === 200) {
        this.projects = (
          await AdminService.getUser(this.$store.state.route.params.userId)
        ).data.projects;
      }
    },
  },
  async created() {
    try {
      const data = (
        await AdminService.getUser(this.$store.state.route.params.userId)
      ).data;
      this.user = data.user;
      this.projects = data.projects;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
</style>