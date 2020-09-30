<template>
  <panel title="BOM">
    <v-toolbar-items slot="action">
      <div>
        <v-btn
          v-if="getBom.length > 0 && !getAssemblies.length"
          @click="deleteBOM"
          class="red ml-2 mt-1"
          title="delete all atoms"
          light
        >
          <v-icon>delete</v-icon>
        </v-btn>
      </div>
      <div v-if="getBom.length > 0">
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
          :href="bomUrl"
          v-if="showDownloadBtn"
          @click="changeShowDownloadBtn"
          class="grey ml-2 mt-1"
          title="download BOM"
        >
          <v-icon>cloud_download</v-icon>
        </v-btn>
      </div>
      <div>
        <v-btn
          @click="toggleCreateAtom"
          class="green ml-2 mt-1"
          title="add atom"
          light
        >
          <v-icon>add</v-icon>
        </v-btn>
      </div>
    </v-toolbar-items>

    <project-view-bom-atom-create v-if="showCreateAtom" />

    <div v-for="atom in getBom" :key="atom.itemNumber">
      <v-layout>
        <v-flex sm4 class="atom">
          <v-layout>
            <div class="font-family: monospace font-weight-black">
              {{ atom.name }} #{{ atom.itemNumber }}
            </div>
          </v-layout>
          <v-layout>
            <v-btn
              color="yellow"
              class="ml-2"
              @click="selectAtomToUpdate(atom)"
              title="update atom"
            >
              <v-icon>update</v-icon>
            </v-btn>
            <v-btn
              v-if="atomToUpdate === atom.uuid"
              @click="hideUpdate"
              class="grey ml-2"
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
          </v-layout>
        </v-flex>
        <v-flex class="image" sm2>
          <img
            class="atom-image"
            :src="atom.imageUrl"
            :alt="atom.name"
            @mouseover="hover = atom.uuid"
            @mouseleave="hover = null"
            @click="fix(atom.uuid)"
          />
        </v-flex>

        <v-flex sm6>
          <v-card
            v-if="hover === atom.uuid || fixed === atom.uuid"
            width="100%"
            outlined
            raised
            dark
            elevation-24
            class="card"
          >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon class="grey" x-small @click="fix(null)" title="close">
                <v-icon>close</v-icon>
              </v-btn>
            </v-card-actions>
            <ul>
              <li>{{ atom.description }}</li>
              <li>qty: {{atom.quantity}}</li>
              <li>
                {{ atom.pseudoUnitCost.toFixed(2) }}
                {{ getProject.currency }}
              </li>
              <li v-if="atom.GTIN">GTIN: {{ atom.GTIN }}</li>
              <li v-if="atom.SKU">SKU: {{ atom.SKU }}</li>
              <li v-if="atom.vendorUrl">
                <a :href="atom.vendorUrl" target="_blank">vendor</a>
              </li>
              <li v-if="atom.link">
                <a :href="atom.link" target="_blank">link</a>
              </li>
              <li v-if="atom.instruction">{{ atom.instruction }}</li>
            </ul>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout wrap>
        <project-view-bom-atom-update
          v-if="atomToUpdate === atom.uuid"
          v-bind:atom="atom"
        />
      </v-layout>
    </div>
  </panel>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import ProjectViewBomAtomCreate from "./ProjectViewBomAtomCreate";
import ProjectViewBomAtomUpdate from "./ProjectViewBomAtomUpdate";
import ProjectService from "@/services/ProjectService";

export default {
  name: "ProjectViewBom",
  components: {
    ProjectViewBomAtomCreate,
    ProjectViewBomAtomUpdate,
  },
  data() {
    return {
      showCreateAtom: false,
      atomToUpdate: null,
      atomDetails: null,
      showDownloadBtn: false,
      bomUrl: null,
      hover: null,
      fixed: null,
    };
  },
  computed: {
    ...mapGetters(["getBom", "getProject", "getAssemblies"]),
  },
  methods: {
    ...mapActions(["fetchBom", "deleteBom", "deleteAtom", "fetchAllProducts"]),
    ...mapMutations(["setAtom"]),
    fix(uuid) {
      this.fixed = uuid;
    },
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
        projectId: projectId,
      };
      const ret = await ProjectService.updateProjectBom(data);
      if (ret.status === 200) {
        // console.log(ret.data.Location)
        this.bomUrl = ret.data.Location;
        this.showDownloadBtn = !this.showDownloadBtn;
      }
    },
    changeShowDownloadBtn() {
      this.showDownloadBtn = !this.showDownloadBtn;
    },
  },
  created() {
    // this.fetchBom(this.getProject.uuid);
    this.fetchBom();
    this.fetchAllProducts(); //to make sure that size of product array is updated
  },
};
</script>

<style scoped>
.atom {
  font-size: 150%;
  /* text-align: center; */
  /* align-self: flex-end; */
  overflow-wrap: break-word;
}
.atom-description {
  font-size: 14px;
}
.atom-material {
  font-size: 24px;
}
.image {
  display: flex;
  justify-content: center;
  overflow-wrap: break-word;
}
.atom-image {
  width: 100px;
  height: 100px;
  cursor: pointer;
}
:any-link {
  text-decoration: none;
}
</style>