<template>
  <div>
    <panel title="Project Metadata">
      <v-form ref="form" > 
      <v-text-field
        label="project name"
        :rules="[rules.required, rules.singleName, rules.string]"
        v-model="project.name"
        id="id"
      ></v-text-field>
      <v-text-field
        label="description"
        :rules="[rules.required]"
        v-model="project.description"
        id="id"
      ></v-text-field>
      </v-form>
    </panel>
    <div class="danger-alert" v-if="error">{{error}}</div>
    <v-btn class="cyan" @click="create">Create project</v-btn>
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

export default {
  data() {
    return {
      project: {
        name: null,
        description: null,
        userID: this.$store.state.user.uuid,
      },
      error: null,
      // required: value => !!value || "Required"
      rules: {
        required: (value) => !!value || "Required.",
        singleName: (value) =>
          !this.getProjectNames.includes(value) || "name already taken!",
        string: (value) => {
          const pattern = /^[0-9a-zA-Z_]+$/;
          return pattern.test(value) || "only alphanumericals and underscores allowed";
        },
      },
    };
  },
  computed: {
    ...mapGetters([
      "getProjectNames", 
      "getProjects",
      "getLoading"
      ]),
  },
  methods: {
    // ...mapMutations([
    //   "addProjectName", 
    //   "setProjectNames"
    //   ]),
    ...mapActions(["createProject"]),
    async create() {
      this.error = null;
      const areAllFieldsFilledIn = Object.keys(this.project).every(
        (key) => !!this.project[key]
      );
      if (!areAllFieldsFilledIn) {
        this.error = "Please fill in all the required fields.";
        return;
      }
      try {
        this.project.state = "created";
        this.project.dateTime = new Date();
        const response = await this.createProject(this.project)
        if(response == 201){

          this.project.name = null
          this.project.description = null
          this.$refs.form.resetValidation()
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