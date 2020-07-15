<template>
  <v-layout column>
    <v-flex xs1>
      <v-text-field v-model="guinea_pig.name" ></v-text-field>
      <v-text-field v-model="guinea_pig.description" ></v-text-field>

      <v-btn class="cyan" @click="update">update guinea pig</v-btn>
      <div v-if="this.message == 'OK'" class="ml-2 msg">
        <span class="green--text">{{message}} guinea pig updated</span>
      </div>
      <div v-if="error" class="red--text msg ml-2">{{error}}</div>
    </v-flex>
  </v-layout>
</template>

<script>
import GuineaPigService from "@/services/GuineaPigService";

export default {
  name: "ExperimentUpdate",
  data() {
    return {
      message: "",
      error: ""
    };
  },
  props: {
    guinea_pig: {
      type: Object
    }
  },
  methods: {
    async update() {
      try {
        this.message = "";
        this.error = "";
        const res = await GuineaPigService.update(this.guinea_pig);
        // this.$emit("guineaPigUpdated", res.data);
        console.log(res.statusText);
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
  display: inline;
}
</style>