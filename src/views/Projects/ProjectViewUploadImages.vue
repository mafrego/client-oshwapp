<template>
  <v-container>
    <form @submit.prevent="submitMultipleFiles" enctype="multipart/form-data">
      <v-layout wrap justify-space-between>
        <v-flex sm12>
          <label for="files" class="label">
            <v-file-input
              v-model="uploadFiles"
              counter
              accept=".png, .jpeg, .jpg, .svg"
              multiple
              value
              @change="selectFile"
              label="select atom images"
              small-chips
              solo
              show-size
              truncate-length="8"
              prepend-icon="mdi-camera"
            />
            <!-- TODO simplify all this using :rules in v-file-input -->
            <div
              v-for="(file, index) in files"
              :key="index"
              :class="`level ${file.invalidMessage}`"
            >
              <div v-if="file.invalidMessage" class="level-left">
                <div class="level-item">
                  {{file.name}}
                  <span
                    v-if="file.invalidMessage"
                    class="invalid"
                  >&nbsp;- {{file.invalidMessage}}</span>
                  <a
                    href="delete"
                    @click.prevent="files.splice(index, 1); uploadFiles.splice(index, 1)"
                  >
                    <v-icon>delete</v-icon>
                  </a>
                </div>
              </div>
            </div>
          </label>
        </v-flex>
        <v-flex sm2>
          <v-btn class="green" @click="submitMultipleFiles" title="upload images">
            <v-icon>cloud_upload</v-icon>
          </v-btn>
          <v-progress-circular
            class="ml-10"
            v-if="loading"
            :indeterminate="loading"
            color="light-blue"
          ></v-progress-circular>
        </v-flex>
        <v-flex sm10>
          
        <div v-if="message" :class="`message ${error ? 'invalid' : 'message-success'}`">
          <div>{{message}}</div>
        </div>
        <div v-for="file in uploadedFiles" :key="file.originalname">{{file.originalname}}</div>
        </v-flex>
      </v-layout>
    </form>
  </v-container>
</template>

<script>
// import FileService from "@/services/FileService";
// import ProjectService from "@/services/ProjectService";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "ProjectViewUploadImages",
  data() {
    return {
      files: [],
      uploadFiles: [],
      message: "",
      error: false,
      uploadedFiles: [],
    };
  },
  computed: {
    ...mapGetters(["getProject"]),
    ...mapState({
      loading: (state) => state.projects.loading,
    }),
  },
  methods: {
    ...mapActions(["uploadImages"]),
    selectFile() {
      this.message = "";
      this.uploadedFiles = [];
      this.files = this.uploadFiles;
      this.files = this.files.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        invalidMessage: this.validate(file),
      }));
    },
    validate(file) {
      // check that MAX_SIZE matches MAX_SIZE in FileUpload middleware in server
      const MAX_SIZE = 70000;
      const allowedTypes = [
        "image/png",
        "image/svg",
        "image/svg+xml",
        "image/jpg",
        "image/jpeg",
      ];
      if (file.size > MAX_SIZE) {
        return `Max size allowed: ${MAX_SIZE / 1000}kB!`;
      }
      if (!allowedTypes.includes(file.type)) {
        return "image type not allowed!";
      }
      return "";
    },
    async submitMultipleFiles() {
      if (this.files.length == 0) {
        this.message = "you need to select at least an image!";
        return;
      }
      const formData = new FormData();
      this.uploadFiles.forEach((file) => {
        if (this.validate(file) === "") {
          formData.append("files", file);
        }
      });
      try {
        //TODO add uploadImages() to vuex projects.js
        // const res = await FileService.uploadImages(formData, this.getProject.uuid);
        const res = await this.uploadImages(formData);
        // console.log(res.data)
        this.uploadedFiles = res.data.files;
        this.message = res.data.message;
        // console.log(res.data.message)
        this.files = [];
        this.uploadFiles = [];
        this.error = false;
      } catch (error) {
        this.message = error.response.data.error;
        this.error = true;
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.invalid {
  color: red;
}
.message-success {
  color: green;
}
</style>