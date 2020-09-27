<template>
  <panel title="Assemblies">
    <v-toolbar-items slot="action">
    </v-toolbar-items>

<v-container fluid>
  
    <div v-for="assembly in getAssemblies" :key="assembly.itemNumber">
          <v-layout>
            <v-flex sm6 class="assembly">
              
            <div class="font-family: monospace font-weight-black">
              {{ assembly.name }} @{{assembly.itemNumber}}
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
        <v-flex class="image" sm6>
          <img class="assembly-image" :src="assembly.imageUrl" :alt="assembly.name" />
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
    };
  },
  computed: {
    ...mapGetters(["getBom", "getProject", "getAssemblies"]),
  },
  methods: {
    ...mapActions(["fetchBom", "deleteBom", "deleteAtom", "fetchAssemblies"]),
    ...mapMutations(["setAtom"]),
    selectAtomToUpdate(assembly) {
      this.assemblyToUpdate = assembly.uuid;
      // this.setAssembly(assembly);
    },
    hideUpdate() {
      this.assemblyToUpdate = null;
    },
  },
  created() {
    // this.fetchBom();
    // this.fetchAllProducts(); //to make sure that size of product array is updated
    this.fetchAssemblies()
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
  align-items: flex-end;
  overflow-wrap: break-word;
}
.assembly-image {
  width: 100px;
  height: 100px;
}
</style>