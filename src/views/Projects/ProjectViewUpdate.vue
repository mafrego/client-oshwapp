<template>
  <div>
    <v-layout column>
      <v-flex xs1>
        <!-- <v-text-field v-model="name" :rules="[rules.isAlphanumeric, rules.uniqueName]" label="name"></v-text-field> -->
        <v-text-field v-model="description" :rules="[rules.isDescription]" label="description"></v-text-field>
        <v-text-field v-model="version" :rules="[rules.isSemanticVersion]" label="version"></v-text-field>
        <v-text-field v-model="country" :rules="[rules.isISO31661]" label="country"></v-text-field>
        <v-text-field v-model="region" :rules="[rules.isISO31662]" label="region"></v-text-field>
        <v-text-field v-model="link" :rules="[rules.isHTTP]" label="projectlink"></v-text-field>

        <v-btn class="yellow" @click="update()">
          <v-icon>save</v-icon>
        </v-btn>
        <div v-if="this.message" class="ml-2 msg">
          <span class="green--text">{{message}}</span>
        </div>
        <div v-if="error" class="red--text msg ml-2">{{error}}</div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import semverRegex from "semver-regex";
import iso31661 from "iso-3166";
import iso31662 from "iso-3166/2";

export default {
  name: "ProjectViewUpdate",
  data() {
    return {
      message: "",
      error: "",
      rules: {
        required: (value) => !!value || "Required.",
        uniqueName: (value) =>
          !this.getProjectNames.includes(value) || "name already taken!",
        isDescription: (value) => {
          const pattern = /^[-a-zA-Z0-9 _.]*$/;
          if(value) return pattern.test(value) || "Only alphanumeric, dots, hyphens, underscore chars";
          else return true
        },
        isAlphanumeric: (value) => {
          const pattern = /^[a-zA-Z0-9_]*$/;
          if(value) return pattern.test(value) || "Only alphanumeric, dots, hyphens, underscore chars";
          else return true
        },
        isSemanticVersion: (value) => {
          if (value) return semverRegex().test(value) || "e.g. 0.0.1";
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
          if (value) return ret || "ISO 3166-1 e.g. IT, ITA, 380 or Italy";
          else return true;
        },
        isISO31662: (value) => {
          let ret = false;
          iso31662.forEach((element) => {
            if (element.code == value || element.name === value) ret = true;
          });
          if (value)
            return (
              ret ||
              "ISO 3166-2 e.g. for county Wicklow in Ireland IE-WW or Wicklow"
            );
          else return true;
        },
        isHTTP: (value) => {
          const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
          if (value) return pattern.test(value) || "Invalid http link";
          else return true;
        },
      }
    };
  },
  computed: {
    ...mapGetters(["getProject", "getProjectNames"]),
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
          return this.$store.state.projects.project.description
        },
        set (value) {
          this.$store.commit('updateProjectDescription', value)
        }
      },
      version: {
        get() {
          return this.$store.state.projects.project.version
        },
        set (value) {
          this.$store.commit('updateProjectVersion', value)
        }
      },
      country: {
        get() {
          return this.$store.state.projects.project.country
        },
        set (value) {
          this.$store.commit('updateProjectCountry', value)
        }
      },
      region: {
        get() {
          return this.$store.state.projects.project.region
        },
        set (value) {
          this.$store.commit('updateProjectRegion', value)
        }
      },
      link: {
        get() {
          return this.$store.state.projects.project.link
        },
        set (value) {
          this.$store.commit('updateProjectLink', value)
        }
      },
  },
  methods: {
    ...mapActions(["updateProject"]),
    async update() {
      // console.log(this.atomToUpdate.description)
      try {
        this.message = "";
        this.error = "";
        const response = await this.updateProject();
        if (response.status === 200) {
          this.message = "project updated";
        } else {
          this.error = "project not updated";
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
</style>