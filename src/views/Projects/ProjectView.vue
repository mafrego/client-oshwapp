<template>
  <panel title="Project" class="font">
    <v-toolbar-items slot="action">
      <div>
        <v-btn
          @click="toggleComponentProjectUpdate"
          class="yellow ml-2 mt-1"
          title="update project metadata"
          light
        >
          <v-icon>update</v-icon>
        </v-btn>
      </div>
      <div>
        <v-btn
          @click="toggleComponentValidateBOM"
          class="grey ml-2 mt-1"
          title="validate BOM"
          light
        >
          <v-icon>done</v-icon>
        </v-btn>
      </div>
      <div>
        <v-btn
          v-if="getProject.state === 'created'"
          @click="toggleComponentUpload"
          class="green ml-2 mt-1"
          title="select yourproject-bom.csv to upload"
          light
        >
          <v-icon>attach_file</v-icon>
        </v-btn>
      </div>
      <div>
        <v-btn
          v-if="getProject.state != 'released'"
          @click="toggleComponentBOM"
          class="yellow ml-2 mt-1"
          title="update BOM"
          light
        >
          <v-icon>list</v-icon>
        </v-btn>
      </div>
      <div>
        <v-btn
          v-if="
            getProject.state === 'assembling' ||
            getProject.state === 'rooted' ||
            getProject.state === 'released'
          "
          @click="toggleComponentUploadImages"
          class="green ml-2 mt-1"
          title="select images to upload"
          light
        >
          <v-icon>add_a_photo</v-icon>
        </v-btn>
      </div>
      <!-- <div>
        <v-btn
          v-if="
            getProject.state === 'assembling' ||
            getProject.state === 'rooted' ||
            getProject.state === 'released'
          "
          @click="toggleComponentAllProducts"
          class="blue ml-2 mt-1"
          title="all products"
          light
        >
          <v-icon>account_tree</v-icon>
        </v-btn>
      </div> -->
      <div>
        <v-btn
          v-if="getProject.state === 'assembling' || getProject.state === 'rooted'"
          @click="toggleComponentAssembleCopy"
          class="green ml-2 mt-1"
          title="assemble"
          light
        >
          <v-icon>handyman</v-icon>
        </v-btn>
      </div>
      <div>
        <v-btn
          v-if="getAssemblies.length > 0"
          @click="toggleComponentAssemblies"
          class="yellow ml-2 mt-1"
          title="update assembly metadata"
          light
        >
          <v-icon>account_tree</v-icon>
        </v-btn>
      </div>
      <div>
        <v-btn
          v-if="getProject.state != 'released'"
          class="red ml-2 mt-1"
          @click="del"
          title="delete project"
          light
        >
          <v-icon>delete</v-icon>
        </v-btn>
      </div>
      <div>
        <v-btn
          v-if="getProject.state === 'released'"
          class="red ml-2 mt-1"
          @click="unrelease()"
          title="recall product"
          light
        >
          <v-icon>construction</v-icon>
        </v-btn>
      </div>
    </v-toolbar-items>

    <v-layout>
      <v-flex sm7>
        <div class="project-state">{{ getProject.state }}:</div>
        <div class="project-name">
          {{ getProject.name }} {{ getProject.version }}
        </div>
        <div class="project-description">{{ getProject.description }}</div>
        <div class>
          {{ getProject.license }}
          <span v-if="!getProject.region">{{ getProject.country }}</span>
          <span v-if="getProject.region">{{ getProject.region }}</span>
        </div>
        <div v-if="getProject.link" class="project-link">
          <a :href="getProject.link" target="_blank">link</a>
        </div>
        <div>{{ getProject.currency }}</div>
        <!-- <div class="project-datetime">date-created: {{getProject.dateTime}}</div> -->
      </v-flex>
      <v-flex class="image" sm4>
        <img class="project-image" :src="getProject.imageUrl" />
      </v-flex>
      <!-- <v-flex sm1>
        <v-progress-circular
          class="ml-10"
          v-if="getLoading"
          :indeterminate="getLoading"
          color="light-blue"
        ></v-progress-circular>
      </v-flex> -->
    </v-layout>
    <br />
    <project-view-update v-if="showComponentUpdate" />
    <project-view-validate-bom v-if="showComponentValidateBOM" />
    <project-view-upload-file v-if="showComponentUpload" />
    <project-view-upload-images v-if="showComponentUploadImages" />
    <project-view-bom v-if="showComponentBOM" />
    <!-- <project-view-all-products v-if="showComponentAllProducts" /> -->
    <project-view-assemble-copy v-if="showComponentAssembleCopy" />
    <project-view-assemblies v-if="showComponentAssemblies" />
  </panel>
</template>

<script>
import ProjectViewValidateBom from "./ProjectViewValidateBom";
import ProjectViewUpdate from "./ProjectViewUpdate";
import ProjectViewUploadFile from "./ProjectViewUploadFile";
import ProjectViewUploadImages from "./ProjectViewUploadImages";
import ProjectViewBom from "./ProjectViewBom";
// import ProjectViewAllProducts from "./ProjectViewAllProducts";
import ProjectViewAssemblies from "./ProjectViewAssemblies";
import ProjectViewAssembleCopy from "./ProjectViewAssembleCopy";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {
    ProjectViewValidateBom,
    ProjectViewUpdate,
    ProjectViewUploadFile,
    ProjectViewUploadImages,
    ProjectViewBom,
    // ProjectViewAllProducts,
    ProjectViewAssemblies,
    ProjectViewAssembleCopy,
  },
  data() {
    return {
      showComponentValidateBOM: false,
      showComponentUpdate: false,
      showComponentUpload: false,
      showComponentUploadImages: false,
      showComponentBOM: false,
      // showComponentAllProducts: false,
      showComponentAssemblies: false,
      showComponentAssembleCopy: false,
    };
  },
  computed: {
    ...mapGetters([
      "getProject",
      "getBom",
      "getLoading",
      "getProjectByID",
      "getAssemblies"
    ]),
  },
  methods: {
    ...mapActions([
      "deleteProject",
      "fetchBom",
      "fetchAssemblableProducts",
      "fetchAllProducts",
      "fetchAssemblies",
      "updateProjectState"
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
    unrelease(){
      this.updateProjectState({ state: 'rooted'})
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
    // toggleComponentAllProducts() {
    //   this.showComponentAllProducts = !this.showComponentAllProducts;
    // },
    toggleComponentAssemblies() {
      this.showComponentAssemblies = !this.showComponentAssemblies;
    },
    toggleComponentAssembleCopy() {
      this.showComponentAssembleCopy = !this.showComponentAssembleCopy;
    },
  },
  created() {
    // order matters: first the project needs to be set
    const project = this.getProjectByID(
      this.$store.state.route.params.projectId
    );
    this.setProject(project);
    this.fetchBom();
    this.fetchAssemblies();
    this.fetchAssemblableProducts();
    // this.fetchAllProducts();
  },
};
</script>

<style scoped>
.font {
  font-family: monospace;
}
:any-link {
  text-decoration: none;
}
.project-name {
  font-size: 170%;
}
.project-description {
  font-size: 100%;
}
.project-material {
  font-size: 100%;
}
.project-state {
  font-size: 100%;
}
.image {
  display: flex;
  justify-content: center;
  align-items: center;
}
.project-image {
  max-width: 200px;
  max-height: 150px;
  min-width: 200px;
  min-height: 150px;
}
.project-datetime {
  font-size: 100%;
}
</style>