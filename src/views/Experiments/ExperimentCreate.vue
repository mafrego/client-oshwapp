<template>
  <v-layout column>
    <v-flex xs1>
      <panel title="Guinea Pig data">
        <v-text-field label="name" v-model="guinea_pig.name"></v-text-field>
        <v-text-field label="description" v-model="guinea_pig.description"></v-text-field>
          <v-btn class="cyan btnres" @click="create">generate guinea pig</v-btn>
          <div v-if="this.message == 'Created'" class="ml-2 msg">
            <span class="green--text">{{message}} guinea pig</span>
            name: {{newguineapig.name}}
            description: {{newguineapig.description}}
          </div>
          <div v-if="error" class="red--text msg ml-2">
            {{error}}
          </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import GuineaPigService from "@/services/GuineaPigService";

export default {
  name: "ExperimentCreate",
  data() {
    return {
      guinea_pig: {
        name: "",
        description: ""
      },
      newguineapig: null,
      message: "",
      error: ""
    };
  },
  methods: {
    async create() {
      try {
        this.error = "";
        this.message = "";
        const res = await GuineaPigService.create(this.guinea_pig);
        this.$emit("guineaPigCreated", res.data);
        this.newguineapig = res.data;
        this.message = res.statusText;
      } catch (error) {
        this.error = error;
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.msg {
  text-align: left;
  display: inline;
}
</style>