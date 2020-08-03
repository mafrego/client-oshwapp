<template>
  <v-layout column>
    <v-flex xs6>
      <panel title="BOM" v-if="getBom.length">
        <v-toolbar-items slot="action">
          <v-btn
            v-if="getBom.length == getAllProducts.length"
            @click="deleteBom"
            class="cyan ml-2"
            title="delete BOM"
            light
          >
            <v-icon>delete</v-icon>
          </v-btn>
        </v-toolbar-items>

        <div v-for="atom in getBom" :key="atom.uuid">
          <v-layout>
            <v-flex xs6>
              <div class="atom-name">{{atom.name}}</div>
              <div class="atom-description">{{atom.description}}</div>
              <div class="atom-material">{{atom.material}}</div>
              <!-- substitute view btn with component to update single atom properties and/or delete it -->
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
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["getBom", "getProject", "getAllProducts"]),
  },
  methods: {
    ...mapActions(["fetchBom", "fetchAssemblableProducts", "deleteBom"]),
  },
  created() {
    this.fetchBom(this.getProject.uuid);
  },
};
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
.atom-image {
  width: 100px;
  height: 100px;
}
</style>