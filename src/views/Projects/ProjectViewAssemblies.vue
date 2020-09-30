<template>
  <panel title="Assemblies">
    <v-toolbar-items slot="action"> </v-toolbar-items>
    <v-container fluid>
      <div v-for="assembly in getAssemblies" :key="assembly.itemNumber">
        <v-layout>
          <v-flex sm4 class="assembly">
            <div class="font-family: monospace font-weight-black">
              {{ assembly.name }} @{{ assembly.itemNumber }}
            </div>
            <v-btn
              color="yellow"
              class="ml-2"
              @click="selectAtomToUpdate(assembly)"
              title="update assembly"
            >
              <v-icon>update</v-icon>
            </v-btn>
            <v-btn
              v-if="assemblyToUpdate === assembly.uuid"
              @click="hideUpdate()"
              class="grey ml-2"
              title="hide update"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </v-flex>
          <v-flex class="image" sm2>
            <img
              class="assembly-image"
              :src="assembly.imageUrl"
              :alt="assembly.name"
            @mouseover="hover = assembly.uuid"
            @mouseleave="hover = null"
            @click="fix(assembly.uuid)"
            />
          </v-flex>

        <v-flex sm6>
          <v-card
            v-if="hover === assembly.uuid || fixed === assembly.uuid"
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
              <li>{{ assembly.description }}</li>
              <li>qty: {{assembly.quantity}}</li>
              <li>
                {{ assembly.pseudoUnitCost.toFixed(2) }}
                {{ getProject.currency }}
              </li>
              <li v-if="assembly.GTIN">GTIN: {{ assembly.GTIN }}</li>
              <li v-if="assembly.SKU">SKU: {{ assembly.SKU }}</li>
              <li v-if="assembly.vendorUrl">
                <a :href="assembly.vendorUrl" target="_blank">vendor</a>
              </li>
              <li v-if="assembly.link">
                <a :href="assembly.link" target="_blank">link</a>
              </li>
              <li v-if="assembly.instruction">{{ assembly.instruction }}</li>
            </ul>
          </v-card>
        </v-flex>
        </v-layout>
        <v-layout wrap>
          <project-view-assemblies-update
            v-if="assemblyToUpdate === assembly.uuid"
            v-bind:assembly="assembly"
          />
        </v-layout>
      </div>
    </v-container>
  </panel>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import ProjectViewAssembliesUpdate from "./ProjectViewAssembliesUpdate";

export default {
  name: "ProjectViewAssemblies",
  components: {
    ProjectViewAssembliesUpdate,
  },
  data() {
    return {
      assemblyToUpdate: null,
      hover: null,
      fixed: null
    };
  },
  computed: {
    ...mapGetters(["getBom", "getProject", "getAssemblies"]),
  },
  methods: {
    ...mapActions(["fetchBom", "deleteBom", "deleteAtom", "fetchAssemblies"]),
    ...mapMutations(["setAssembly"]),
    fix(uuid) {
      this.fixed = uuid;
    },
    selectAtomToUpdate(assembly) {
      this.assemblyToUpdate = assembly.uuid;
      this.setAssembly(assembly);
    },
    hideUpdate() {
      this.assemblyToUpdate = null;
    },
  },
  created() {
    this.fetchAssemblies();
  },
};
</script>

<style scoped>
.assembly {
  font-size: 150%;
  /* text-align: center; */
  /* align-self: flex-end; */
  overflow-wrap: break-word;
}
.assembly-description {
  font-size: 14px;
}
.assembly-material {
  font-size: 24px;
}
.image {
  display: flex;
  justify-content: center;
  overflow-wrap: break-word;
}
.assembly-image {
  width: 100px;
  height: 100px;
  cursor: pointer;
}
:any-link {
  text-decoration: none;
}
</style>