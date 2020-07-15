<template>
  <div>
    <form @submit.prevent="submitSingleFile" enctype="multipart/form-data">
      <div class="field">
        <label for="file" class="label">
          single file
          <v-file-input
            v-model="file"
            value
            label="single file"
            chips
            show-size
            truncate-length="100"
          />
        </label>
        <v-btn class="cyan" @click="submitSingleFile">Send</v-btn>
      </div>
    </form>
    <form @submit.prevent="submitMultipleFiles" enctype="multipart/form-data">
      <div class="field">
        <label for="files" class="label">
          multiple files
          <v-file-input
            v-model="files"
            multiple
            value
            label="multiple files"
            chips
            show-size
            truncate-length="100"
          />
        </label>
        <v-btn class="cyan" @click="submitMultipleFiles">Send</v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import FileService from "@/services/FileService";

export default {
  name: "ProjectViewUploadTest",
  data() {
    return {
      file: [],
      files: [],
      message: "",
      error: false
    };
  },
  props: {
    projectid: {
      type: String
    }
  },
  methods: {
    async submitSingleFile() {
      let formData = new FormData();
      // the name "file" is the same used in server with middleware multer
      formData.append("file", this.file);
      try {
        await FileService.sendSingleFile(formData);
        this.file = [];
        this.error = false;
      } catch (error) {
        console.log(error);
        this.message = error.response.data.error;
        this.error = true;
      }
    },
    async submitMultipleFiles() {
      console.log("submitMultipleFiles")
      let formData = new FormData();
      // the name "file" is the same used in server with middleware multer
      this.files.forEach(file => formData.append("files", file))
      // formData.append("files", this.files);
      try {
        await FileService.sendMultipleFiles(formData);
        this.file = [];
        this.error = false;
      } catch (error) {
        console.log(error);
        this.message = error.response.data.error;
        this.error = true;
      }
    }
  }
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