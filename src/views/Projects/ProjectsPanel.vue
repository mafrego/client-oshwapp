<template>
  <div class="container">
    <v-layout column>
      <v-flex xs6>
        <panel title="Projects">
          <v-toolbar-items slot="action">
            <div>
              <v-btn
                @click="toggleComponentValidateBOM"
                class="grey ml-2 mt-1"
                title="validate BOM"
                light
              >
                <v-icon>done</v-icon>
              </v-btn>
            </div>
            <div>
              <v-btn
                @click="toggleComponentCreateProject"
                class="green ml-2 mt-1"
                title="create project"
                light
              >
                <v-icon>add_circle</v-icon>
              </v-btn>
            </div>
          </v-toolbar-items>

          <project-view-validate-bom v-if="showComponentValidateBOM" />

          <projects-panel-create v-if="showComponentCreateProject" />
          <br />
          <div v-for="project in getProjects" :key="project.uuid">
            <v-layout>
              <v-flex sm8>
                <div class="project-name">project name: {{project.name}}</div>
                <!-- <div class="project-description">{{project.description}}</div> -->
                <div class="project-state">status: {{project.state}}</div>
                <!-- <div class="project-datetime">{{project.dateTime}}</div> -->
                <v-btn
                  class="blue"
                  :to="{
                    name: 'project',
                    params: {
                      projectId: project.uuid
                    } 
                  }"
                  title="open project"
                >
                  <v-icon>pageview</v-icon>
                </v-btn>
              </v-flex>

              <v-flex sm4>
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
import ProjectViewValidateBom from "./ProjectViewValidateBom";
import ProjectsPanelCreate from "./ProjectsPanelCreate";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "ProjectsPanel",
  components: {
    ProjectViewValidateBom,
    ProjectsPanelCreate,
  },
  data() {
    return {
      showComponentValidateBOM: false,
      showComponentCreateProject: false,
    };
  },
  computed: {
    // TODO substitute state with getters
    ...mapState(["user"]),
    ...mapGetters(["getProjects"]),
  },
  methods: {
    ...mapActions(["fetchProjects"]),
    toggleComponentValidateBOM() {
      this.showComponentValidateBOM = !this.showComponentValidateBOM;
    },
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
.container {
  font-family: monospace;
}
</style>