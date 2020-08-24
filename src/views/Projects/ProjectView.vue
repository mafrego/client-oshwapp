<template>
  <panel title="Project">
    <v-toolbar-items slot="action">
      <v-btn @click="toggleComponentValidateBOM" class="grey ml-2" title="validate BOM" light>
        <v-icon>done</v-icon>
      </v-btn>
      <v-btn
        v-if="getProject.state != 'released'"
        @click="toggleComponentUpload"
        class="green ml-2"
        title="upload BOM"
        light
      >
        <v-icon>attach_file</v-icon>
      </v-btn>
      <v-btn @click="toggleComponentBOM" class="blue ml-2" title="list BOM" light>
        <v-icon>list</v-icon>
      </v-btn>
      <v-btn
        v-if="getProject.state === 'assembling' || getProject.state === 'rooted' || getProject.state === 'released'"
        @click="toggleComponentUploadImages"
        class="green ml-2"
        title="upload images"
        light
      >
        <v-icon>add_a_photo</v-icon>
      </v-btn>
      <v-btn
        v-if="getProject.state === 'assembling' || getProject.state === 'rooted' || getProject.state === 'released'"
        @click="toggleComponentAllProducts"
        class="blue ml-2"
        title="all products"
        light
      >
        <v-icon>account_tree</v-icon>
      </v-btn>
      <v-btn
        v-if="getProject.state === 'assembling' || getProject.state === 'rooted'"
        @click="toggleComponentAssembleCopy"
        class="green ml-2"
        title="assemble"
        light
      >
        <v-icon>handyman</v-icon>
      </v-btn>
      <v-btn
        @click="toggleComponentProjectUpdate"
        class="yellow ml-2"
        title="update project"
        light
      >
        <v-icon>update</v-icon>
      </v-btn>
      <v-btn
        v-if="getProject.state != 'released'"
        class="red ml-2"
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

    <project-view-validate-bom v-if="showComponentValidateBOM" />
    <br />
    <project-view-update v-if="showComponentUpdate" />
    <br />
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
import ProjectViewValidateBom from "./ProjectViewValidateBom";
import ProjectViewUpdate from "./ProjectViewUpdate";
import ProjectViewUploadFile from "./ProjectViewUploadFile";
import ProjectViewUploadImages from "./ProjectViewUploadImages";
import ProjectViewBom from "./ProjectViewBom";
import ProjectViewAllProducts from "./ProjectViewAllProducts";
import ProjectViewAssembleCopy from "./ProjectViewAssembleCopy";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {
    ProjectViewValidateBom,
    ProjectViewUpdate,
    ProjectViewUploadFile,
    ProjectViewUploadImages,
    ProjectViewBom,
    ProjectViewAllProducts,
    ProjectViewAssembleCopy,
  },
  data() {
    return {
      showComponentValidateBOM: false,
      showComponentUpdate: false,
      showComponentUpload: false,
      showComponentUploadImages: false,
      showComponentBOM: false,
      showComponentAllProducts: false,
      showComponentAssembleCopy: false,
    };
  },
  computed: {
    ...mapGetters([
      "getProject",
      "getBom",
      "getAssemblableProducts",
      "getLoading",
    ]),
  },
  methods: {
    ...mapActions([
      "deleteProject",
      "fetchBom",
      "fetchAssemblableProducts",
      "fetchAllProducts",
    ]),
    ...mapMutations(["setProject"]),
    del() {
      try {
        if (confirm("are you sure?")) {
          this.deleteProject(this.getProject.uuid);
          this.$router.push({
            name: "projects",
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    toggleComponentValidateBOM() {
      this.showComponentValidateBOM = !this.showComponentValidateBOM;
    },
    toggleComponentProjectUpdate() {
      this.showComponentUpdate = !this.showComponentUpdate;
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