<template>
  <div>
    <panel title="Project Metadata">
      <v-form ref="form">
        <v-text-field
          label="project name"
          :rules="[rules.required, rules.uniqueName, rules.isAlphanumeric]"
          v-model="project.name"
          id="id"
        ></v-text-field>
        <v-text-field
          label="description"
          :rules="[rules.required, rules.isDescription]"
          v-model="project.description"
          id="id"
        ></v-text-field>
        <v-text-field
          label="version"
          :rules="[rules.required, rules.isSemanticVersion]"
          v-model="project.version"
          id="id"
        ></v-text-field>
        <!-- does it make sense? -->
        <!-- <v-text-field
          label="license"
          :rules="[rules.required, rules.isAlphanumeric]"
          v-model="project.license"
          id="id"
        ></v-text-field> -->
        <v-text-field label="country" :rules="[rules.required, rules.isISO31661]" v-model="project.country" id="id"></v-text-field>
        <v-text-field label="region" :rules="[rules.isISO31662]" v-model="project.region" id="id"></v-text-field>
        <v-text-field
          label="project link"
          :rules="[rules.isHTTP]"
          v-model="project.projectUrl"
          id="id"
        ></v-text-field>
      </v-form>
    </panel>
    <div class="danger-alert" v-if="error">{{error}}</div>
    <div class="green--text" v-if="message">{{message}}</div>
    <v-btn class="green mt-2" @click="create" title="save">
      <v-icon>save</v-icon>
    </v-btn>
    <v-progress-circular
      class="ml-10"
      v-if="getLoading"
      :indeterminate="getLoading"
      color="light-blue"
    ></v-progress-circular>
    <br />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import semverRegex from "semver-regex";
import iso31661 from "iso-3166";
import iso31662 from "iso-3166/2";

export default {
  data() {
    return {
      project: {
        name: null,
        description: null,
        version: null,
        // license: null,
        country: null,
        region: null,
        projectUrl: null,
        userID: this.$store.state.user.uuid,
      },
      error: "",
      message: "",
      rules: {
        required: (value) => !!value || "Required.",
        uniqueName: (value) =>
          !this.getProjectNames.includes(value) || "name already taken!",
        isAlphanumeric: (value) => {
          const pattern = /^[-0-9a-zA-Z_]+$/;
          if (value)
            return (
              pattern.test(value) || "only alphanumeric hyphens underscores"
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
          if (value) return semverRegex().test(value) || "e.g. 0.0.1";
          else return true;
        },
        isHTTP: (value) => {
          const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
          if (value) return pattern.test(value) || "Invalid http link";
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
      },
    };
  },
  computed: {
    ...mapGetters([
      "getProjectNames",
      "getLoading",
    ]),
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
        this.project.state = "created";
        this.project.dateTime = new Date();
        const response = await this.createProject(this.project);
        if (response == 201) {
          this.message = "project created";

          this.project.name = null;
          this.project.description = null;
          this.project.version = null;
          // this.project.license = null;
          this.project.country = null;
          this.project.region = null;
          this.project.projectUrl = null;
          this.$refs.form.resetValidation();
        }
      } catch (err) {
        console.log(err);
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