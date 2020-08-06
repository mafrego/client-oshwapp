<template>
  <div class="container">
    <v-layout column>
      <v-flex xs6>
        <panel title="Projects">
          <v-toolbar-items slot="action">
            <v-btn
              @click="toggleComponentCreateProject"
              class="cyan ml-2"
              title="create project"
              light
            >
              <v-icon>add_circle</v-icon>
            </v-btn>
          </v-toolbar-items>

          <projects-panel-create v-if="showComponentCreateProject" />
          <br />
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
import ProjectsPanelCreate from "./ProjectsPanelCreate";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "ProjectsPanel",
  components: {
    ProjectsPanelCreate,
  },
  data() {
    return {
      showComponentCreateProject: false,
    };
  },
  computed: {
    // TODO substitute state with getters
    ...mapState(["user", "isUserLoggedIn"]),
    ...mapGetters(["getProjects"]),
  },
  methods: {
    ...mapActions(["fetchProjects"]),
    toggleComponentCreateProject() {
      this.showComponentCreateProject = !this.showComponentCreateProject;
    },
  },
  created() {
    if (!this.user) {
      this.$router.push("/login");
    }
    this.fetchProjects(this.user.uuid);
  },
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