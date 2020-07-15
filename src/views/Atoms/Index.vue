<template>
  <v-layout column>
    <v-flex xs6>
      <atom-search-panel/>
      <atoms-panel class="mt-2"/>
    </v-flex>
  </v-layout>
</template>

<script>
import AtomsPanel from './AtomsPanel'
import AtomService from "@/services/AtomService";
import AtomSearchPanel from './AtomSearchPanel'

export default {
  components: {
    AtomsPanel,
    AtomSearchPanel
  },
  data() {
    return {
      atoms: null,
    };
  },
  methods:{
      // navigateTo(route){
      //     this.$router.push(route)
      // }
  },
  async mounted() {
    //do a request to the backend for all atoms
    this.atoms = (await AtomService.index()).data;
  }
};
</script>

<style scoped>
.atom-name{
  font-size: 30px;
  }
.atom-description{
  font-size: 18px;
}
.atom-material{
  font-size: 24px;
}
</style>