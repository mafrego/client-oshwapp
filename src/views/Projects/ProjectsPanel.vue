<template>
  <div class="container">
    <v-layout column>
      <v-flex xs6>
        <panel title="Projects">
          <v-btn
            v-if="isUserLoggedIn"
            class="cyan ml-2"
            :to="{name: 'projects-create'}"
            slot="action"
            title="create project"
            light
          >
            <v-icon>add_circle</v-icon>
          </v-btn>
          <div v-for="project in getProjects" :key="project.uuid">
            <v-layout>
              <v-flex xs6>
                <div class="project-name">{{project.name}}</div>
                <div class="project-description">{{project.description}}</div>
                <div class="project-state">{{project.state}}</div>
                <div class="project-datetime">{{project.dateTime}}</div>
                <v-btn
                  class="cyan"
                  :to="{
              name: 'project',
              params: {
                projectId: project.uuid
              } 
              }"
                >manage</v-btn>
              </v-flex>

              <v-flex xs6>
                <img class="project-image" :src="project.imageUrl" />
              </v-flex>
            </v-layout>
          </div>
        </panel>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
// import ProjectService from "@/services/ProjectService";
import {mapState, mapActions, mapGetters} from 'vuex'

export default {
  name: "ProjectsPanel",
  // data() {
  //   return {
  //     projects: []
  //   };
  // },
  computed: {
    ...mapState(["user", "isUserLoggedIn"]),
    ...mapGetters(['getProjects'])
  },
  methods: {
    ...mapActions(['fetchProjects'])
  },
  created(){
    if (!this.user) {
      this.$router.push("/login");
    }
    this.fetchProjects(this.user.uuid)
  },
  // async mounted() {
  //   if (!this.user) {
  //     this.$router.push("/login");
  //   }
  //   this.projects = (await ProjectService.index(this.user.uuid)).data;
  // },
};
</script>

<style scoped>
.project-image {
  max-width: 200px;
  max-height: 150px;
  min-width: 200px;
  min-height: 150px;
}
.project-datetime {
  font-size: 12px;
}
</style>