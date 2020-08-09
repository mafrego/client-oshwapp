<template>
  <panel title="Project">
    <v-toolbar-items slot="action">
      <v-btn 
        v-if="getProject.state != 'released'"
        @click="toggleComponentUpload" 
        class="cyan ml-2" 
        title="upload BOM" 
        light
      >
        <v-icon>attach_file</v-icon>
      </v-btn>
      <v-btn
        v-if="getProject.state === 'assembling' || getProject.state === 'rooted' || getProject.state === 'released'"
        @click="toggleComponentUploadImages"
        class="cyan ml-2"
        title="upload images"
        light
      >
        <v-icon>add_a_photo</v-icon>
      </v-btn>
      <v-btn
        v-if="getProject.state === 'assembling' || getProject.state === 'rooted' || getProject.state === 'released' "
        @click="toggleComponentBOM"
        class="cyan ml-2"
        title="BOM"
        light
      >
        <v-icon>list</v-icon>
      </v-btn>
      <v-btn
        v-if="getProject.state === 'assembling' || getProject.state === 'rooted' || getProject.state === 'released'"
        @click="toggleComponentAllProducts"
        class="cyan ml-2"
        title="all products"
        light
      >
        <v-icon>account_tree</v-icon>
      </v-btn>
      <v-btn
        v-if="getProject.state === 'assembling' || getProject.state === 'rooted'"
        @click="toggleComponentAssembleCopy"
        class="cyan ml-2"
        title="assemble copy"
        light
      >
        <v-icon>handyman</v-icon>
      </v-btn>
      <v-btn
        v-if="getProject.state != 'released'"
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
        <div class="project-datetime">{{getProject.dateTime}}</div>
      </v-col>
      <v-col md6>
        <img class="project-image" :src="getProject.imageUrl" />
      </v-col>
          <v-progress-circular
            class="ml-10"
            v-if="getLoading"
            :indeterminate="getLoading"
            color="light-blue"
          ></v-progress-circular>
    </v-row>

    <project-view-upload-file v-if="showComponentUpload" />
    <br />
    <project-view-upload-images v-if="showComponentUploadImages" />
    <br />
    <project-view-bom v-if="showComponentBOM" />
    <br />
    <project-view-all-products v-if="showComponentAllProducts" />
    <br />
    <project-view-assemble-copy v-if="showComponentAssembleCopy" />
  </panel>
</template>

<script>
import ProjectViewUploadFile from "./ProjectViewUploadFile";
import ProjectViewUploadImages from "./ProjectViewUploadImages";
import ProjectViewBom from "./ProjectViewBom";
import ProjectViewAllProducts from "./ProjectViewAllProducts";
import ProjectViewAssembleCopy from "./ProjectViewAssembleCopy";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {
    ProjectViewUploadFile,
    ProjectViewUploadImages,
    ProjectViewBom,
    ProjectViewAllProducts,
    ProjectViewAssembleCopy,
  },
  data() {
    return {
      showComponentUpload: false,
      showComponentUploadImages: false,
      showComponentBOM: false,
      showComponentAllProducts: false,
      showComponentAssembleCopy: false,
    };
  },
  computed: {
    ...mapGetters(["getProject", "getBom", "getAssemblableProducts", "getLoading"]),
  },
  methods: {
    ...mapActions([
      "deleteProject",
      "fetchBom",
      "fetchAssemblableProducts",
      "fetchAllProducts",
    ]),
    ...mapMutations(["setProject"]),
    // TODO add alert pop up to confirm project deletion
    del() {
      try {
        this.deleteProject(this.getProject.uuid);
        this.$router.push({
          name: "projects",
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
    toggleComponentAllProducts() {
      this.showComponentAllProducts = !this.showComponentAllProducts;
    },
    toggleComponentAssembleCopy() {
      this.showComponentAssembleCopy = !this.showComponentAssembleCopy;
    },
  },
  created() {
    this.setProject(this.$store.state.route.params.projectId);
    this.fetchBom(this.getProject.uuid);
    this.fetchAssemblableProducts(this.getProject.uuid);
    this.fetchAllProducts(this.getProject.uuid);
  },
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