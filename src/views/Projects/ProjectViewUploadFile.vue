<template>
  <form @submit.prevent="submitFile" enctype="multipart/form-data">
    <!-- TODO fix color message with right classes -->
    <div v-if="message" :class="`${error ? 'message-error' : 'message-success'}`">
      <div class="message-body">{{message}}</div>
    </div>
    <div class="field">
      <label for="file" class="label">
        Upload BOM
        <!-- the v-file-input works with v-model -->
        <v-file-input
          v-model="file"
          value
          accept=".csv"
          label=".csv file"
          ref="file"
          chips
          show-size
          truncate-length="100"
        />
        <!-- normal input works with extra function selectFile -->
        <!-- <input type="file" ref="file" @change="selectFile" /> -->
      </label>
      <v-btn class="cyan" @click="submitFile">Send</v-btn>
    </div>
  </form>
</template>

<script>
import FileService from "@/services/FileService";
import ProjectService from "@/services/ProjectService";

export default {
  name: "ProjectViewUploadFile",
  data() {
    return {
      // substitutte "" with [] to eliminate Vue warn
      file: [],
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
    async submitFile() {
      if(this.file.length == 0){
        this.message = 'you need to select a .csv file!'
        return
      }
      let formData = new FormData();
      let msg = {};
      // the name "file" is the same used in server with middleware multer
      formData.append("file", this.file);
      try {
        // I need the projectId to bind the BOM atoms to the project
        msg = await FileService.sendBom(formData, this.projectid);
        this.message = msg.data.message;
        // substitutte "" with [] to eliminate Vue warn
        this.file = [];
        this.error = false;
      } catch (error) {
        console.log(error);
        this.message = error.response.data.error;
        this.error = true;
      }
      if (msg.status == 201) {
        const project = (await ProjectService.put({ state: "assembling" }, this.projectid)).data
        // TODO This part has to be susbstituted using Vuex
        // I have to put an if(project) otherwise event emits before project is returned
        if(project){
          this.$emit("projectStateUpdated", project)
        }
        console.log(project)
      }
    }
  }
};
</script>

<style scoped>
.message-error{
  color: red;
}
.message-success{
  color: green;
}
</style>