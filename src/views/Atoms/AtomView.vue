<template>
  <div>
    <!-- ABYME for testing router -->
    <div>
      <router-view></router-view>
    </div>
    <!-- <v-container> -->
    <panel title="Atom">
      <v-toolbar-items slot="action">
        <v-btn
          v-if="$store.state.users.isUserLoggedIn"
          class="cyan ml-2"
          :to="{name: 'atoms-create'}"
          light
        >
          <v-icon>add_circle</v-icon>
        </v-btn>
        <v-btn
          v-if="$store.state.users.isUserLoggedIn"
          class="cyan ml-2"
          @click="del"
          title="delete atom"
          light
        >
          <v-icon>delete</v-icon>
        </v-btn>
      </v-toolbar-items>
      <v-row slot="view">
        <v-col md6>
          <div class="atom-name">{{atom.name}}</div>
          <div class="atom-description">{{atom.description}}</div>
          <div class="atom-material">{{atom.material}}</div>
        </v-col>
        <v-col md6>
          <img class="atom-image" :src="atom.imageUrl" />
        </v-col>
      </v-row>
    </panel>
    <!-- </v-container> -->
  </div>
</template>

<script>
import AtomService from "@/services/AtomService";

export default {
  name: 'AtomView',
  data() {
    return {
      atom: {}
    };
  },
  async mounted() {
    const atomId = this.$store.state.route.params.atomId;
    console.log(atomId)
    this.atom = (await AtomService.show(atomId)).data;
    console.log(this.atom);
  },
  methods: {
    async del() {
      try {
        await AtomService.delete(this.atom.uuid);
        this.$router.push({
          name: "atoms"
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
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
</style>