<template>
  <panel title="Project">
    <v-toolbar-items slot="action">
      <v-btn @click="toggleComponentUpload" class="cyan ml-2" title="toggle Upload BOM" light>
        <v-icon>attach_file</v-icon>
      </v-btn>
      <v-btn @click="toggleComponentUploadImages" class="cyan ml-2" title="toggle upload images" light>
        <v-icon>add_a_photo</v-icon>
      </v-btn>
      <v-btn @click="toggleComponentBOM" class="cyan ml-2" title="toggle show BOM" light>
        <v-icon>list</v-icon>
      </v-btn>
      <v-btn @click="toggleAssemble" class="cyan ml-2" title="assemble object" light>
        <v-icon>build</v-icon>
      </v-btn>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        class="cyan ml-2"
        @click="del"
        title="delete project"
        light
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-toolbar-items>

    <v-row>
      <v-col md6>
        <div class="project-name">{{getProject.name}}</div>
        <div class="project-description">{{getProject.description}}</div>
        <div class="project-material">{{getProject.material}}</div>
        <div class="project-state">{{getProject.state}}</div>
        <!-- <div class="project-datetime">{{project.dateTime.day.low}}/{{project.dateTime.month.low}}/{{project.dateTime.year.low}}</div> -->
        <div class="project-datetime">{{getProject.dateTime}}</div>
      </v-col>
      <v-col md6>
        <img class="project-image" :src="getProject.imageUrl" />
      </v-col>
    </v-row>

    <project-view-upload-file
      v-if="showComponentUpload"
    />
    <br />
    <project-view-upload-images
      v-if="showComponentUploadImages"
    />
    <br />
    <project-view-bom v-if="showComponentBOM" />
    <br />
    <project-view-assemble
      v-if="showComponentAssemble"
    />


  </panel>
</template>

<script>
import ProjectService from "@/services/ProjectService";
import ProjectViewUploadFile from "./ProjectViewUploadFile";
import ProjectViewUploadImages from "./ProjectViewUploadImages";
// import ProjectViewUploadTest from "./ProjectViewUploadTest";
import ProjectViewBom from "./ProjectViewBom";
import ProjectViewAssemble from "./ProjectViewAssemble";
import {mapGetters, mapMutations} from 'vuex'

export default {
  components: {
    ProjectViewUploadFile,
    ProjectViewUploadImages,
    // ProjectViewUploadTest,
    ProjectViewBom,
    ProjectViewAssemble
  },
  data() {
    return {
      showComponentUpload: false,
      showComponentUploadImages: false,
      showComponentBOM: false,
      showComponentAssemble: false
    };
  },
  computed:{
    ...mapGetters(['getProject'])
  },
  methods: {
    // ...mapActions(['fetchProject']),
    ...mapMutations(['setProject']),
    async del() {
      try {
        await ProjectService.delete(this.getProject.uuid);
        this.$router.push({
          name: "projects"
        });
      } catch (err) {
        console.log(err);
      }
    },
    toggleComponentUpload() {
      this.showComponentUpload = !this.showComponentUpload;
    },
    toggleComponentUploadImages() {
      this.showComponentUploadImages = !this.showComponentUploadImages;
    },
    toggleComponentBOM() {
      this.showComponentBOM = !this.showComponentBOM;
    },
    toggleAssemble() {
      this.showComponentAssemble = !this.showComponentAssemble;
    },
  },
  created(){
    this.setProject(this.$store.state.route.params.projectId)
  }
};
</script>

<style scoped>
.project-name {
  font-size: 30px;
}
.project-description {
  font-size: 16px;
}
.project-material {
  font-size: 16px;
}
.project-state {
  font-size: 16px;
}
.project-image {
  max-width: 200px;
  max-height: 150px;
  min-width: 200px;
  min-height: 150px;
}
.project-datetime {
  font-size: 12px;
}
</style>