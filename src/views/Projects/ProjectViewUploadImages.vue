<template>
  <div>
    <form @submit.prevent="submitMultipleFiles" enctype="multipart/form-data">
      <div class="field">
        <label for="files" class="label">
          upload images
          <v-file-input
            v-model="uploadFiles"
            multiple
            value
            @change="selectFile"
            label="images"
            chips
            show-size
            truncate-length="10"
          />
          <div v-for="(file, index) in files" :key="index" :class="`level ${file.invalidMessage}`">
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
        <v-btn 
          class="green" 
          @click="submitMultipleFiles"
          title="upload images"
          >
          <v-icon>cloud_upload</v-icon>
          </v-btn>
      <v-progress-circular class="ml-10" v-if="loading" :indeterminate="loading" color="light-blue"></v-progress-circular>
      </div>
    </form>
    <div v-if="message" :class="`message ${error ? 'invalid' : 'message-success'}`">
      <div>{{message}}</div>
    </div>
    <div v-for="file in uploadedFiles" :key="file.originalname">{{file.originalname}}</div>
  </div>
</template>

<script>
// import FileService from "@/services/FileService";
// import ProjectService from "@/services/ProjectService";
import {mapGetters, mapActions, mapState} from 'vuex'

export default {
  name: "ProjectViewUploadImages",
  data() {
    return {
      files: [],
      uploadFiles: [],
      message: "",
      error: false,
      uploadedFiles: []
    };
  },
  computed: {
    ...mapGetters(['getProject']),
    ...mapState({
      loading: (state) => state.projects.loading,
    }),
  },
  methods: {
    ...mapActions(['fetchAssemblableProducts', 'uploadImages']),
    selectFile() {
      this.message = "";
      this.uploadedFiles = []
      this.files = this.uploadFiles;
      this.files = this.files.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        invalidMessage: this.validate(file)
      }));
    },
    validate(file) {
      // check that MAX_SIZE matches MAX_SIZE in FileUpload middleware in server
      const MAX_SIZE = 500000;
      const allowedTypes = ["image/png", "image/svg", "image/jpg", "image/jpeg"];
      if (file.size > MAX_SIZE) {
        return `Max size allowed: ${MAX_SIZE / 1000}Kb!`;
      }
      if (!allowedTypes.includes(file.type)) {
        return "image type not allowed!";
      }
      return "";
    },
    async submitMultipleFiles() {
      if(this.files.length == 0){
        this.message = "you need to select at least an image!"
        return
      }
      const formData = new FormData();
      this.uploadFiles.forEach(file => {
        if (this.validate(file) === "") {
          formData.append("files", file);
        }
      });
      try {
        //TODO add uploadImages() to vuex projects.js(not necessary for the moment)
        // const res = await FileService.uploadImages(formData, this.getProject.uuid);
        const res = await this.uploadImages(formData);
        // console.log(res.data)
        this.uploadedFiles = res.data.files;
        this.message = res.data.message
        // console.log(res.data.message)
        this.files = [];
        this.uploadFiles = [];
        this.error = false;
        // this.fetchAssemblableProducts(this.getProject.uuid)
      } catch (error) {
        this.message = error.response.data.error;
        this.error = true;
        console.log(error);
      }
    }
  }
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