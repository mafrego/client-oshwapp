<template>
  <v-layout column>
    <v-flex xs6>
      <panel title="Guinea Pig">
        <v-btn
          @click="toggleComponentCreate"
          class="cyan ml-2"
          slot="action"
          title="create guinea pig"
          light
        >
          <v-icon>add_circle</v-icon>
        </v-btn>
        <v-btn
          @click="toggleComponentReadAll"
          class="cyan ml-2"
          slot="action"
          title="get all guinea pig"
          light
        >
          <v-icon>menu_book</v-icon>
        </v-btn>
        <v-btn
          @click="searchGuineaPig"
          class="cyan ml-2"
          slot="action"
          title="search guinea pig"
          light
        >
          <v-icon>search</v-icon>
        </v-btn>

          <v-text-field class="mt-7 ml-2 mr-2"
            slot="action"
            label="search guinea pig by name"
            v-model="search"
            >
          </v-text-field>

    <div v-for="guinea_pig in guineaPigs" :key="guinea_pig.uuid">
      <v-layout>
        <v-flex xs4>
          <div class="project-name">name: {{guinea_pig.name}}</div>
          <div class="project-description">description: {{guinea_pig.description}}</div>
        </v-flex>
        <v-flex xs2>
          <img class="project-image" :src="guinea_pig.imageUrl" />
        </v-flex>
      </v-layout>
    </div>

        <!-- call readAll again most expensive and slow solution-->
        <!-- <experiment-create v-if="showComponentCreate" @guineaPigCreated="isGuineaPigCreated = true" /><br> -->
        <experiment-create v-if="showComponentCreate" @guineaPigCreated="newGuineaPigCreated" /><br>
        <!-- just passing newly created guineaPig and add it to guinea_pigs array in child component -->
        <experiment-read-all v-if="showComponentReadAll" v-bind:guineaPig="guineaPig" v-bind:isGuineaPigCreated="isGuineaPigCreated" /><br>
        <!-- <experiment-read v-if="showComponentRead" /> -->
        <experiment-update v-if="showComponentUpdate" /><br>
        <experiment-delete v-if="showComponentDelete" /><br>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import GuineaPigService from '@/services/GuineaPigService'
import ExperimentCreate from "./ExperimentCreate";
// import ExperimentRead from "./ExperimentRead";
import ExperimentReadAll from "./ExperimentReadAll";
import ExperimentUpdate from "./ExperimentUpdate";
import ExperimentDelete from "./ExperimentDelete";

export default {
  name: "Experiments",
  components: {
    ExperimentCreate,
    ExperimentReadAll,
    ExperimentUpdate,
    ExperimentDelete,
  },
  data() {
    return {
      showComponentCreate: false,
      showComponentReadAll: false,
      showComponentUpdate: false,
      showComponentDelete: false,
      isGuineaPigCreated: false,        //for slow solution
      guineaPig: {},
      search: '',
      guineaPigs: []
    };
  },
  methods: {
    toggleComponentCreate() {
      this.showComponentCreate = !this.showComponentCreate;
    },
    toggleComponentReadAll() {
      this.showComponentReadAll = !this.showComponentReadAll;
    },
    toggleComponentUpdate() {
      this.showComponentUpdate = !this.showComponentUpdate;
    },
    toggleComponentDelete() {
      this.showComponentDelete = !this.showComponentDelete;
    },
    newGuineaPigCreated(guineaPig){
      this.guineaPig = guineaPig
    },
    async searchGuineaPig(){
      this.guineaPigs = (await GuineaPigService.search(this.search)).data
    }
  }
};
</script>

<style scoped>
</style>