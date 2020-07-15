<template>
  <panel title="Index">
    <div v-for="guinea_pig in guinea_pigs" :key="guinea_pig.uuid">
      <v-layout>
        <v-flex xs4>
          <div class="project-name">name: {{guinea_pig.name}}</div>
          <div class="project-description">description: {{guinea_pig.description}}</div>
          <v-btn class="cyan" @click="openComponentUpdate(guinea_pig.uuid)" title="update">
            <v-icon>update</v-icon>
          </v-btn>
          <v-btn class="cyan ml-2" @click="deleteGuineaPig(guinea_pig.uuid)" title="delete">
            <v-icon>delete</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs2>
          <img class="project-image" :src="guinea_pig.imageUrl" />
        </v-flex>
      <experiment-update v-if="showComponentUpdate == guinea_pig.uuid" v-bind:guinea_pig="guinea_pig" />
      </v-layout>
    </div>
  </panel>
</template>

<script>
import GuineaPigService from "@/services/GuineaPigService";
import ExperimentUpdate from "./ExperimentUpdate";

export default {
  name: "ExperimentReadAll",
  components: {
    ExperimentUpdate
  },
  data() {
    return {
      guinea_pigs: [],
      showComponentUpdate: "",
      msg: ""
    };
  },
  props: {
    isGuineaPigCreated : {
        type: Boolean
    },
    guineaPig:{
        type: Object
    }
},
  async mounted() {
    this.guinea_pigs = (await GuineaPigService.getAll()).data;
  },
  methods: {
    openComponentUpdate(guinea_pigId) {
      this.showComponentUpdate = guinea_pigId
    },
    async deleteGuineaPig(guinea_pigId) {
      console.log("deleteing guinea pig with id: " + guinea_pigId);
      this.msg = await GuineaPigService.delete(guinea_pigId);
      this.guinea_pigs = (await GuineaPigService.getAll()).data;
    }
  },
  watch:{
    //   for slow solution
      isGuineaPigCreated: async function(){
        this.guinea_pigs = (await GuineaPigService.getAll()).data;
      },
      guineaPig: function(){
        this.guinea_pigs.push(this.guineaPig)
      }
  }
};
</script>

<style scoped>
</style>