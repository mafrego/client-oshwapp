<template>
  <div>
    <panel title="Project Metadata">
      <v-text-field label="project name"  :rules="[rules.required]" v-model="project.name" id="id"></v-text-field>
      <v-text-field
        label="description"
        :rules="[rules.required]"
        v-model="project.description"
        id="id"
      ></v-text-field>
      <!-- <v-text-field label="img url" :rules="[rules.required, rules.http]" v-model="project.imageUrl" id="id"></v-text-field> -->
    </panel>
    <div class="danger-alert" v-if="error">{{error}}</div>
    <v-btn class="cyan" @click="create">Create project</v-btn>
  </div>
</template>

<script>
import ProjectService from "@/services/ProjectService";

export default {
  data() {
    return {
      project: {
        name: null,
        description: null,
        userID: this.$store.state.users.user.uuid,
      },
      error: null,
      // required: value => !!value || "Required"
      rules: {
        required: value => !!value || "Required.",
        counter: value => value.length >= 8 || "Min 8 characters",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        http: value => {
          const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
          return pattern.test(value) || "Invalid http link";
        },
        float: value => {
          const pattern = /^[+-]?\d+(\.\d+)?$/;
          return pattern.test(value) || "Invalid float";
        },
      } 
    };
  },
  methods: {
    async create() {
      this.error = null;
      const areAllFieldsFilledIn = Object.keys(this.project).every(
        key => !!this.project[key]
      );
      if (!areAllFieldsFilledIn) {
        this.error = "Please fill in all the required fields.";
        return;
      }
      try {
        // fix image URL
        this.project.state = "created"
        this.project.dateTime = new Date()
        // this.project.imageUrl = "https://oshwpublicbucket.s3.eu-central-1.amazonaws.com/service/project.svg"
        await ProjectService.post(this.project);
        this.$router.push({
          name: "projects"
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.danger-alert {
  color: red;
}
</style>