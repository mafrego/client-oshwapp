<template>
  <div>
    <v-container>
      <v-layout row wrap justify-space-between>
        <v-flex sm7>
          <v-text-field
            v-model="description"
            :rules="[rules.required, rules.isDescription]"
            dense
            solo-inverted
            label="description"
          ></v-text-field>
        </v-flex>
        <v-flex sm2>
          <v-text-field
            v-model="version"
            :rules="[rules.required, rules.isSemanticVersion]"
            dense
            solo-inverted
            label="version"
          ></v-text-field>
        </v-flex>
        <v-flex sm2>
          <v-text-field
            v-model="license"
            :rules="[rules.required, rules.isAlphanumeric]"
            dense
            solo-inverted
            label="license"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap justify-space-between>
        <v-flex sm2>
          <v-text-field
            v-model="country"
            :rules="[rules.required, rules.isISO31661]"
            dense
            solo-inverted
            label="country"
          ></v-text-field>
        </v-flex>
        <v-flex v-if="region" sm2>
          <v-text-field
            v-model="region"
            :rules="[rules.isISO31662]"
            dense
            solo-inverted
            label="region"
          ></v-text-field>
        </v-flex>
        <v-flex v-if="link" sm7>
          <v-text-field
            v-model="link"
            :rules="[rules.isHTTP]"
            dense
            solo-inverted
            label="link"
          ></v-text-field>
        </v-flex>
        <v-flex v-if="!region" sm2>
          <v-text-field
            v-model="addRegion"
            :rules="[rules.isISO31662]"
            dense
            solo-inverted
            label="add region"
          ></v-text-field>
        </v-flex>
        <v-flex v-if="!link" sm7>
          <v-text-field
            v-model="addLink"
            :rules="[rules.isHTTP]"
            dense
            solo-inverted
            label="add link"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-space-between>
        <v-flex sm1>
          <v-btn class="yellow" @click="update()" title="save">
            <v-icon>save</v-icon>
          </v-btn>
        </v-flex>
        <v-flex sm1>
          <v-progress-circular
            class="ml-10"
            v-if="isLoading"
            :indeterminate="isLoading"
            color="light-blue"
          ></v-progress-circular>
        </v-flex>
        <v-flex sm9>
          <div v-if="this.message" class="msg green--text">{{ message }}</div>
          <div v-if="error" class="red--text msg">{{ error }}</div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import semverRegex from "semver-regex";
import ProjectService from "@/services/ProjectService";
import iso31661 from "iso-3166";
import iso31662 from "iso-3166/2";

export default {
  name: "ProjectViewUpdate",
  data() {
    return {
      message: "",
      error: "",
      addRegion: null,
      addLink: null,
      isLoading: false,
      rules: {
        required: (value) => !!value || "required",
        uniqueName: (value) =>
          !this.getProjectNames.includes(value) || "name already taken!",
        isDescription: (value) => {
          const pattern = /^[^,;]+$/;
          if (value)
            return (
              pattern.test(value) || "any char except for commas and semicolons"
            );
          else return true;
        },
        isAlphanumeric: (value) => {
          const pattern = /^[a-zA-Z0-9_]*$/;
          if (value) return pattern.test(value) || "only alphanumeric";
          else return true;
        },
        isSemanticVersion: (value) => {
          if (value) return semverRegex().test(value) || "x.y.z";
          else return true;
        },
        isISO31661: (value) => {
          let ret = false;
          iso31661.forEach((element) => {
            if (
              element.alpha2 == value ||
              element.alpha3 === value ||
              element.numeric === value ||
              element.name === value
            )
              ret = true;
          });
          if (value) return ret || "ISO 3166-1";
          else return true;
        },
        isISO31662: (value) => {
          let ret = false;
          iso31662.forEach((element) => {
            if (element.code == value || element.name === value) ret = true;
          });
          if (value) return ret || "ISO 3166-2";
          else {
            this.region = null;
            this.addRegion = null;
            return true;
          }
        },
        isHTTP: (value) => {
          const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
          if (value) return pattern.test(value) || "Invalid http link";
          else {
            this.link = null;
            this.addLink = null;
            return true;
          }
        },
      },
    };
  },
  computed: {
    ...mapGetters(["getProject", "getProjectNames", "getErrorUpdateProject"]),
    // name: {
    //   get() {
    //     return this.$store.state.projects.project.name
    //   },
    //   set (value) {
    //     this.$store.commit('updateProjectName', value)
    //   }
    // },
    description: {
      get() {
        return this.$store.state.projects.project.description;
      },
      set(value) {
        this.$store.commit("updateProjectDescription", value);
      },
    },
    version: {
      get() {
        return this.$store.state.projects.project.version;
      },
      set(value) {
        this.$store.commit("updateProjectVersion", value);
      },
    },
    license: {
      get() {
        return this.$store.state.projects.project.license;
      },
      set(value) {
        this.$store.commit("updateProjectLicense", value);
      },
    },
    country: {
      get() {
        return this.$store.state.projects.project.country;
      },
      set(value) {
        this.$store.commit("updateProjectCountry", value);
      },
    },
    region: {
      get() {
        return this.$store.state.projects.project.region;
      },
      set(value) {
        this.$store.commit("updateProjectRegion", value);
      },
    },
    link: {
      get() {
        return this.$store.state.projects.project.link;
      },
      set(value) {
        this.$store.commit("updateProjectLink", value);
      },
    },
  },
  methods: {
    ...mapActions(["updateProject"]),
    ...mapMutations(["setLoading"]),
    async update() {
      this.message = null;
      this.error = null;
      if (
        // this.project.name &&
        this.description &&
        this.version &&
        this.license &&
        this.country
      ) {
        this.error = null;
      } else {
        this.error = "Please fill in all the required fields.";
        return;
      }
      const project = {
        description: this.description,
        version: this.version,
        license: this.license,
        country: this.country,
      };
      if (this.region) {
        project.region = this.region;
      } else if (this.addRegion) {
        project.region = this.addRegion;
      } else {
        project.region = null;
      }
      if (this.link) {
        project.link = this.link;
      } else if (this.addLink) {
        project.link = this.addLink;
      } else {
        project.link = null;
      }
      // console.log('this.region:', this.region)
      // console.log('this.addRegion:', this.addRegion)
      // console.log(project.region)
      // console.log('this.link:', this.link)
      // console.log('this.addLink:', this.addLink)
      // console.log(project.link)
      try {
        this.isLoading = true;
        const response = await ProjectService.updateProject(
          project,
          this.getProject.uuid
        );
        // console.log(response.data);
        if (response.status === 200) {
          this.message = "project metadata updated";
          this.updateProject(response.data);
          this.addRegion = null;
          this.addLink = null;
        }
      } catch (error) {
        this.error = error.response.data.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
</style>