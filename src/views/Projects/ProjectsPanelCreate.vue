<template>
  <div>
    <panel title="Project Metadata">
      <v-container>
        <v-layout row wrap justify-space-between>
          <v-flex sm3>
            <v-text-field
              label="name"
              :rules="[rules.required, rules.uniqueName, rules.isAlphanumeric]"
              v-model="project.name"
              solo-inverted
              dense
              persistent-hint
            ></v-text-field>
          </v-flex>
          <v-flex sm5>
            <v-text-field
              label="description"
              :rules="[rules.required, rules.isDescription]"
              v-model="project.description"
              solo-inverted
              dense
            ></v-text-field>
          </v-flex>
          <v-flex sm2>
            <v-text-field
              label="version"
              :rules="[rules.required, rules.isSemanticVersion]"
              v-model="project.version"
              solo-inverted
              dense
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-space-between>
          <v-flex sm2>
            <v-text-field
              label="license"
              :rules="[rules.required, rules.isAlphanumeric]"
              v-model="project.license"
              solo-inverted
              dense
            ></v-text-field>
          </v-flex>
          <v-flex sm2>
            <v-text-field
              label="country"
              :rules="[rules.required, rules.isISO31661]"
              v-model="project.country"
              solo-inverted
              dense
            ></v-text-field>
          </v-flex>
          <v-flex sm2>
            <v-text-field
              label="region"
              :rules="[rules.isISO31662]"
              v-model="project.region"
              solo-inverted
              dense
            ></v-text-field>
          </v-flex>
          <v-flex sm4>
            <v-text-field
              label="link"
              :rules="[rules.isHTTP]"
              v-model="project.link"
              solo-inverted
              dense
            ></v-text-field>
          </v-flex>
        </v-layout>

    <div class="danger-alert" v-if="error">{{error}}</div>
    <div class="green--text" v-if="message">{{message}}</div>
    <v-btn class="green mt-2" @click="create" title="create project">
      <v-icon>save</v-icon>
    </v-btn>
    <v-progress-circular
      class="ml-10"
      v-if="isLoading"
      :indeterminate="isLoading"
      color="light-blue"
    ></v-progress-circular>
      </v-container>
    </panel>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import semverRegex from "semver-regex";
import iso31661 from "iso-3166";
import iso31662 from "iso-3166/2";
import PorjectService from "@/services/ProjectService";

export default {
  data() {
    return {
      project: {
        name: null,
        description: null,
        version: null,
        license: null,
        country: null,
        region: null,
        link: null,
        userID: this.$store.state.user.uuid,
      },
      error: "",
      message: "",
      isLoading: false,
      rules: {
        required: (value) => !!value || "Required.",
        uniqueName: (value) =>
          !this.getProjectNames.includes(value) || "name already taken!",
        isAlphanumeric: (value) => {
          const pattern = /^[-0-9a-zA-Z_]+$/;
          if (value)
            return (
              pattern.test(value) || "only alphanumeric!"
            );
          else return true;
        },
        string: (value) => {
          const pattern = /^[0-9a-zA-Z_]+$/;
          return (
            pattern.test(value) ||
            "only alphanumericals and underscores allowed"
          );
        },
        isDescription: (value) => {
          const pattern = /^[^,;]+$/;
          if (value)
            return pattern.test(value) || "any char but commas and semicolons";
          else return true;
        },
        isSemanticVersion: (value) => {
          if (value) return semverRegex().test(value) || "x.y.z";
          else return true;
        },
        isHTTP: (value) => {
          const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
          if (value) return pattern.test(value) || "invalid http link";
          else {
            // set to null otherwise neo4j error
            this.project.link = null;
            return true;
          }
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
          if (value)
            return (
              ret ||
              "ISO 3166-2"
            );
          else {
            // set to null otherwise neo4j error
            this.project.region = null;
            return true;
          }
        },
      },
    };
  },
  computed: {
    ...mapGetters(["getProjectNames", "getLoading"]),
  },
  methods: {
    ...mapActions(["createProject"]),
    async create() {
      this.error = null;
      this.message = null;
      if (
        this.project.name &&
        this.project.description &&
        this.project.version &&
        // this.project.license &&
        this.project.country
      ) {
        this.error = null;
      } else {
        this.error = "Please fill in all the required fields.";
        return;
      }
      try {
        this.isLoading = true;
        this.project.state = "created";
        this.project.dateTime = new Date();
        const response = await PorjectService.post(this.project);
        // console.log(response)
        if (response.status === 201) {
          this.createProject(response.data);
          this.$router.push({
            name: "project",
            params: { projectId: response.data.uuid },
          });
        }
      } catch (error) {
        this.error = error.response.data.message;
        console.log("error: ", error.response.data);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.danger-alert {
  color: red;
}
</style>