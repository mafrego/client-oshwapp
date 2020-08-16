<template>
  <v-layout column>
    <v-flex xs6>
      <panel title="BOM" v-if="getBom.length">
        <v-toolbar-items slot="action">
          <v-btn
            v-if="getBom.length == getAllProducts.length"
            @click="deleteBom"
            class="red ml-2"
            title="delete BOM"
            light
          >
            <v-icon>delete</v-icon>
          </v-btn>
          <v-btn
            @click="toggleCreateAtom"
            class="green ml-2"
            title="add atom"
            light
          >
            <v-icon>add</v-icon>
          </v-btn>
        </v-toolbar-items>

        <project-view-bom-atom-create v-if="showCreateAtom" />

        <div v-for="atom in getBom" :key="atom.uuid">
          <v-layout>
            <v-flex xs6>
              <div class="atom-name">{{atom.name}}</div>
              <div class="atom-description">{{atom.description}}</div>
              <div class="atom-material">{{atom.material}}</div>

              <v-btn color="blue" @click="selectAtomDetails(atom.uuid)" title="atom details">
                <v-icon>article</v-icon>
              </v-btn>
              <project-view-bom-atom-details v-if="atomDetails === atom.uuid" v-bind:atom="atom" />
              <v-btn
                v-if="atomDetails === atom.uuid"
                @click="hideDetails"
                color="grey"
                title="hide"
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
              <project-view-bom-atom-update v-if="atomToUpdate === atom.uuid" v-bind:atom="atom"/>
              <v-btn
                v-if="atomToUpdate === atom.uuid"
                @click="hideUpdate"
                color="grey"
                title="hide"
              >
                <v-icon>close</v-icon>
              </v-btn>

              <v-btn
                v-if="atom.quantity === atom.quantity_to_assemble"
                class="ml-2"
                color="red"
                @click="deleteAtom(atom.uuid)"
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
import AtomService from "@/services/AtomService";
import ProjectViewBomAtomCreate from "./ProjectViewBomAtomCreate";
import ProjectViewBomAtomDetails from "./ProjectViewBomAtomDetails";
import ProjectViewBomAtomUpdate from "./ProjectViewBomAtomUpdate";

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
      "fetchAllProducts",
    ]),
    ...mapMutations(["setAtom"]),
    toggleCreateAtom(){
      this.showCreateAtom = !this.showCreateAtom
    },
    selectAtomToUpdate(atom) {
      this.atomToUpdate = atom.uuid;
      this.setAtom(atom)
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
    // TODO refactor the function: add deleteAtom in projects.js and update BOM there after atom deletion
    async deleteAtom(atomID) {
      try {
        const ret = await AtomService.delete(atomID);
        if (ret.status === 200) {
          this.fetchBom(this.getProject.uuid);
        }
      } catch (err) {
        console.log(err);
      }
    },
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