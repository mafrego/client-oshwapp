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
// import FileService from "@/services/FileService";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ProjectViewUploadFile",
  data() {
    return {
      // substitutte "" with [] to eliminate Vue warn
      file: [],
      message: "",
      error: false,
    };
  },
  computed: {
    ...mapGetters(["getProject"]),
  },
  methods: {
    ...mapActions(["updateProjectState", "sendBom"]),
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
      if (this.file.length == 0) {
        this.message = "you need to select a .csv file!";
        return;
      }
      let formData = new FormData();
      // let msg = {};
      // the name "file" is the same used in server with middleware multer
      formData.append("file", this.file);
      try {
        // TODO substitute sendBom with a corresponding vuex action(but not necessary now) 
        // msg = await FileService.sendBom(formData, this.getProject.uuid);
        const msg = await this.sendBom(formData);
        if(msg){
        this.message = "bom uploaded!"
        // substitutte "" with [] to eliminate Vue warn
        let project = {
          state: "assembling",
          uuid: this.getProject.uuid,
        };
        this.updateProjectState(project)
        this.file = [];
        this.error = false;
        }
      } catch (error) {
        console.log(error);
        this.message = error.response.data.error;
        this.error = true;
      }
      // if (msg.status == 201) {
      // // update project state to 'assembling'
      //   let project = {
      //     state: "assembling",
      //     uuid: this.getProject.uuid,
      //   };
      //   this.updateProjectState(project)
      // }
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