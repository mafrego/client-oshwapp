<template>
  <v-layout column>
    <v-flex xs6>
      <panel title="BOM" v-if="getBom.length > 0">
        <v-toolbar-items slot="action">
          <div>
            <v-btn
              v-if="getBom.length > 0 && getBom.length == getAllProducts.length"
              @click="deleteBOM"
              class="red ml-2 mt-1"
              title="delete all atoms"
              light
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </div>
          <div>
            <v-btn
              @click="updateProjectBom(getProject.uuid)"
              class="green ml-2 mt-1"
              title="generate bom.csv"
              light
              v-if="!showDownloadBtn"
            >
              <v-icon>article</v-icon>
            </v-btn>
          </div>
          <div>
            <v-btn
              :href="getProject.bopUrl"
              v-if="showDownloadBtn"
              @click="changeShowDownloadBtn"
              class="grey ml-2 mt-1"
              title="download BOM"
            >
              <v-icon>cloud_download</v-icon>
            </v-btn>
          </div>
          <!-- <v-btn @click="toggleCreateAtom" class="green ml-2" title="add atom" light>
            <v-icon>add</v-icon>
          </v-btn>-->
        </v-toolbar-items>

        <project-view-bom-atom-create v-if="showCreateAtom" />

        <div v-for="atom in getBom" :key="atom.itemNumber">
          <v-layout>
            <v-flex xs6>
              <div class="atom-name">{{atom.name}}</div>

              <v-btn color="blue" @click="selectAtomDetails(atom.uuid)" title="atom details">
                <v-icon>article</v-icon>
              </v-btn>
              <project-view-bom-atom-details v-if="atomDetails === atom.uuid" v-bind:atom="atom" />
              <v-btn
                v-if="atomDetails === atom.uuid"
                @click="hideDetails"
                color="grey"
                title="hide details"
              >
                <v-icon>close</v-icon>
              </v-btn>

              <v-btn
                color="yellow"
                class="ml-2"
                @click="selectAtomToUpdate(atom)"
                title="update atom"
              >
                <v-icon>update</v-icon>
              </v-btn>
              <project-view-bom-atom-update v-if="atomToUpdate === atom.uuid" v-bind:atom="atom" />
              <v-btn
                v-if="atomToUpdate === atom.uuid"
                @click="hideUpdate"
                color="grey"
                title="hide update"
              >
                <v-icon>close</v-icon>
              </v-btn>

              <v-btn
                v-if="atom.quantity === atom.quantity_to_assemble"
                class="ml-2"
                color="red"
                @click="deleteATOM(atom.uuid)"
                title="delete atom"
              >
                <v-icon>delete</v-icon>
              </v-btn>
            </v-flex>

            <v-flex xs6>
              <img class="atom-image" :src="atom.imageUrl" :alt="atom.name" />
            </v-flex>
          </v-layout>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import ProjectViewBomAtomCreate from "./ProjectViewBomAtomCreate";
import ProjectViewBomAtomDetails from "./ProjectViewBomAtomDetails";
import ProjectViewBomAtomUpdate from "./ProjectViewBomAtomUpdate";
import ProjectService from "@/services/ProjectService";

export default {
  name: "ProjectViewBom",
  components: {
    ProjectViewBomAtomCreate,
    ProjectViewBomAtomDetails,
    ProjectViewBomAtomUpdate,
  },
  data() {
    return {
      showCreateAtom: false,
      atomToUpdate: null,
      atomDetails: null,
      showDownloadBtn: false,
    };
  },
  computed: {
    ...mapGetters(["getBom", "getProject", "getAllProducts"]),
  },
  methods: {
    ...mapActions([
      "fetchBom",
      "fetchAssemblableProducts",
      "deleteBom",
      "deleteAtom",
      "fetchAllProducts",
    ]),
    ...mapMutations(["setAtom"]),
    toggleCreateAtom() {
      this.showCreateAtom = !this.showCreateAtom;
    },
    selectAtomToUpdate(atom) {
      this.atomToUpdate = atom.uuid;
      this.setAtom(atom);
    },
    hideUpdate() {
      this.atomToUpdate = null;
    },
    selectAtomDetails(i) {
      this.atomDetails = i;
    },
    hideDetails() {
      this.atomDetails = null;
    },
    async deleteBOM() {
      try {
        if (confirm("are you sure?")) {
          await this.deleteBom();
        }
      } catch (error) {
        console.log("error:", error);
      }
    },
    async deleteATOM(atomID) {
      try {
        if (confirm("are you sure?")) {
          await this.deleteAtom(atomID);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async updateProjectBom(projectId) {
      const data = {
        projectName: this.getProject.name, 
        projectId: projectId 
        };
      const ret = await ProjectService.updateProjectBom(data);
      // console.log("ret:", ret);
      if (ret.status === 200) {
        this.showDownloadBtn = !this.showDownloadBtn;
      }
    },
    changeShowDownloadBtn(){
      this.showDownloadBtn = !this.showDownloadBtn
    }
  },
  created() {
    this.fetchBom(this.getProject.uuid);
    this.fetchAllProducts(this.getProject.uuid); //to make sure that size of product array is updated
  },
};
</script>

<style scoped>
.atom-name {
  font-size: 14px;
}
.atom-description {
  font-size: 14px;
}
.atom-material {
  font-size: 24px;
}
.atom-image {
  width: 100px;
  height: 100px;
}
</style>