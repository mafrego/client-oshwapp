<template>
  <div>
    <div>
      priorities:
      <v-btn @click="filterTodos(1)" class="red ml-2">1</v-btn>
      <v-btn @click="filterTodos(2)" class="orange ml-2">2</v-btn>
      <v-btn @click="filterTodos(3)" class="yellow ml-2">3</v-btn>
      <v-btn @click="filterTodos(4)" class="light-green accent-3 ml-2">4</v-btn>
      <v-btn @click="filterTodos(5)" class="green ml-2">5</v-btn>
      <v-btn id="filterbtn" class="cyan ml-2" @click="getAllTodos">all</v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "TodosFilter",
  data() {
    return {
      selected: 1
    };
  },
  methods: {
    ...mapActions(["filterTodos", "getAllTodos"]),
    select() {
      this.filterTodos(this.selected);
    }
  },
};
</script>

<style scoped>
</style>