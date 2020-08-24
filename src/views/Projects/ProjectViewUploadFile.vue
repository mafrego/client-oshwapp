<template>
  <form @submit.prevent="submitFile" enctype="multipart/form-data">
    <div v-if="getErrorBom" class="message-error">
      <ul>
        <li v-for="error in getErrorBom" :key="error">{{error}}</li>
      </ul>
      </div>
    <div v-if="message" class="message-error">{{message}}</div>
    <div v-if="getProject.state === 'assembling'" class="message-success">BOM uploaded!</div>
    <div v-if="getProject.state != 'assembling'" class="field">
      <label for="file" class="label">
        <!-- the v-file-input works with v-model -->
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
        <!-- normal input works with extra function selectFile -->
        <!-- <input type="file" ref="file" @change="selectFile" /> -->
      </label>
      <v-btn class="green" @click="submitFile" title="upload BOM">
        <v-icon>cloud_upload</v-icon>
      </v-btn>
      <v-progress-circular class="ml-10" v-if="loading" :indeterminate="loading" color="light-blue"></v-progress-circular>
    </div>
  </form>
</template>

<script>
// import FileService from "@/services/FileService";
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "ProjectViewUploadFile",
  data() {
    return {
      // substitutte "" with [] to eliminate Vue warn
      file: [],
      message: "",
      error: "",
    };
  },
  computed: {
    ...mapGetters(["getProject", "getBom", "getErrorBom", "getLoading"]),
    ...mapState({
      loading: (state) => state.projects.loading,
    }),
  },
  mounted() {
    this.setErrorBom(null);
  },
  methods: {
    ...mapActions([
      "sendBom",
      "fetchAssemblableProducts",
    ]),
    ...mapMutations(["setErrorBom"]),
    // no need of following method with v-file-input
    selectFile() {
      const file = this.$refs.file.files[0];
      const allowedTypes = ["text/csv"];
      const MAX_SIZE = 20000;
      const tooLarge = file.size > MAX_SIZE;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.file = file;
        this.file = file;
        this.error = false;
        this.message = "";
      } else {
        this.error = true;
        this.message = tooLarge
          ? `Too large. Max size is ${MAX_SIZE / 1000}Kb`
          : "Only csv file allowed";
      }
    },
    submitFile() {
      this.message = "";
      if (this.file.length == 0) {
        this.message = "you need to select a .csv file!";
        return;
      }
      let formData = new FormData();
      // the name "file" is the same used in server with middleware multer
      formData.append("file", this.file);
      this.sendBom(formData);
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