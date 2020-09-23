<template>
  <v-container>
    <form @submit.prevent="submitFile" enctype="multipart/form-data">
      <v-layout justify-space-between>
        <v-flex sm4 v-if="getBom.length === 0">
          <label for="file" class="label">
            <v-file-input
              v-model="file"
              value
              accept=".csv"
              label="select BOM.csv"
              ref="file"
              chips
              solo
              dense
              show-size
              truncate-length="100"
            />
          </label>
        </v-flex>
        <v-flex sm2 v-if="getBom.length === 0">
          <v-btn class="green" @click="submitFile" title="upload BOM">
            <v-icon>cloud_upload</v-icon>
          </v-btn>
          <v-progress-circular
            class="ml-10"
            v-if="getLoading"
            :indeterminate="getLoading"
            color="light-blue"
          ></v-progress-circular>
        </v-flex>
        <v-flex sm5>
          <div v-if="getErrorBom" class="message-error">
            <ul>
              <li v-for="error in getErrorBom" :key="error">{{error}}</li>
            </ul>
          </div>
          <div v-if="message" class="message-error">{{message}}</div>
          <div v-if="getProject.state === 'assembling'" class="message-success">BOM uploaded!</div>
          <div v-if="getProject.state != 'assembling'" class="field"></div>
        </v-flex>
      </v-layout>
    </form>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "ProjectViewUploadFile",
  data() {
    return {
      // file: [] to eliminate Vue warn, neither file: {} nor file: null
      file: [],
      message: "",
      error: "",
    };
  },
  computed: {
    ...mapGetters(["getProject", "getBom", "getErrorBom", "getLoading"]),
  },
  mounted() {
    this.setErrorBom(null);
  },
  methods: {
    ...mapActions(["sendBom"]),
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
      const projectName = this.getProject.name;
      if (this.file.name != projectName + "-bom.csv") {
        this.message = "file name has to be " + projectName + "-bom.csv";
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