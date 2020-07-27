<template>
  <v-layout column>
    <v-flex xs6>
      <panel title="Atom">
        <v-btn
          v-if="$store.state.isUserLoggedIn"
          class="cyan ml-2"
          :to="{name: 'atoms-create'}"
          slot="action"
          title="create atom"
          light
        >
          <v-icon>add_circle</v-icon>
        </v-btn>
        <v-btn
          v-if="$store.state.isUserLoggedIn"
          class="cyan ml-2"
          :to="{name: 'assemblies-create'}"
          slot="action"
          title="create assembly"
          light
        >
          <v-icon>group_work</v-icon>
        </v-btn>
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
import AtomService from "@/services/AtomService";

export default {
  data() {
    return {
      atoms: null
    };
  },
  methods: {
    // navigateTo(route){
    //     this.$router.push(route)
    // }
  },
  watch: {
    "$route.query.search": {
      immediate: true,
      async handler(value) {
        this.atoms = (await AtomService.index(value)).data;
      }
    }
  }

  // we don't need this because of the previous watch
  // async mounted() {
  //   this.atoms = (await AtomService.index()).data;
  // }
};
</script>

<style scoped>
.atom-name {
  font-size: 30px;
}
.atom-description {
  font-size: 18px;
}
.atom-material {
  font-size: 24px;
}
</style>