<template>
  <v-layout column>
    <v-flex xs6>
      <panel title="BOM" v-if="atoms.length">
        <div v-for="atom in atoms" :key="atom.uuid">
          <v-layout>
            <v-flex xs6>
              <div class="atom-name">{{atom.name}}</div>
              <div class="atom-description">{{atom.description}}</div>
              <div class="atom-material">{{atom.material}}</div>
              <v-btn
                class="cyan"
                :to="{
              name: 'product',
              params: {
                productId: atom.uuid
              } 
              }"
              >View</v-btn>
            </v-flex>

            <v-flex xs6>
              <img class="atom-image" :src="atom.imageUrl" />
            </v-flex>
          </v-layout>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
// import ProjectService from "@/services/ProjectService";

export default {
  data() {
    return {
      atoms: []
    };
  },
  props: {
    project: {
      type: Object
    }
  },
  mounted() {
    //from object prop project get all relative atoms
    this.atoms = this.project.consists_of.map(rel => rel.node);
    //listen to event from project-view-file-upload component as soon as atom nodes are created
  }
}
</script>

<style scoped>
.atom-name {
  font-size: 30px;
}
.atom-description {
  font-size: 12px;
}
.atom-material {
  font-size: 24px;
}
</style>