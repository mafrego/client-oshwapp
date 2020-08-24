<template>
  <form @submit.prevent="submitFile" enctype="multipart/form-data">
    <div v-if="errors" class="message-error">
      <ul>
        <li v-for="error in errors" :key="error">{{error}}</li>
      </ul>
    </div>
    <div v-if="message" class="message-error">{{message}}</div>
    <div v-if="success" class="message-success">{{success}}</div>

    <label for="file" class="label">
      <v-file-input
        v-model="file"
        value
        accept=".csv"
        label="select BOM.csv"
        ref="file"
        chips
        show-size
        truncate-length="100"
      />
    </label>
    <v-btn class="grey" @click="submitFile" title="check BOM">
      <v-icon>check_circle</v-icon>
    </v-btn>
  </form>
</template>

<script>
import FileService from "@/services/FileService";

export default {
  name: "ProjectViewValidateBom",
  data() {
    return {
      file: [],
      message: "",
      error: "",
      errors: [],
      success: ""
    };
  },
  methods: {
    // no need of following method with v-file-input
    selectFile() {
      const file = this.$refs.file.files[0];
      const allowedTypes = ["text/csv"];
      const MAX_SIZE = 20000;
      const tooLarge = file.size > MAX_SIZE;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.file = file;
        this.error = false;
        this.message = "";
      } else {
        this.error = true;
        this.message = tooLarge
          ? `Too large. Max size is ${MAX_SIZE / 1000}kB`
          : "Only csv file allowed";
      }
    },
    async submitFile() {
      this.errors = []
      this.message = ""
      this.success = ""
      if (this.file.length == 0) {
        this.message = "you need to select a .csv file!";
        return;
      }
      let formData = new FormData();
      // the name "file" is the same used in server with middleware multer
      formData.append("file", this.file);
      try {
        await FileService.checkBom(formData);
        this.success = "file "+ this.file.name + " is valid!"
      } catch (error) {
        this.errors = error.response.data;
      }
      this.file = [];
    },
  },
};
</script>

<style scoped>
.message-error {
  color: red;
}
.message-success {
  color: green;
}
</style>