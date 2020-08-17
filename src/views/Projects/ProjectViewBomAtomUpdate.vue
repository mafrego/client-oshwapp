<template>
  <div>
    <v-btn color="blue" @click="loadData(atom)" title="actual values">
      <v-icon>refresh</v-icon>
    </v-btn>
    <v-layout column>
      <v-flex xs1>
        <v-text-field v-model="atomToUpdate.description" label="description"></v-text-field>
        <!-- TODO if quantity can be updated then update quantity_to_assemble as well -->
        <!-- <v-text-field v-model="atomToUpdate.quantity" label="quantity" type="number" min="1"></v-text-field> -->
        <v-text-field v-model="atomToUpdate.cost" label="cost" type="number" min="0" step="any"></v-text-field>
        <v-text-field v-model="atomToUpdate.currency" label="currency"></v-text-field>
        <v-text-field v-model="atomToUpdate.link" label="link"></v-text-field>
        <v-text-field v-model="atomToUpdate.vendorUrl" label="vendor"></v-text-field>
        <v-text-field v-model="atomToUpdate.moq" label="mimimum quantity order"></v-text-field>
        <v-text-field v-model="atomToUpdate.leadTime" label="lead time"></v-text-field>
        <v-text-field v-model="atomToUpdate.material" label="material"></v-text-field>
        <v-text-field v-model="atomToUpdate.weight" label="weight"></v-text-field>
        <v-text-field v-model="atomToUpdate.notes" label="notes"></v-text-field>

        <v-btn class="yellow" @click="update()">
          <v-icon>save</v-icon>
        </v-btn>
        <div v-if="this.message" class="ml-2 msg">
          <span class="green--text">{{message}}</span>
        </div>
        <div v-if="error" class="red--text msg ml-2">{{error}}</div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ProjectViewBomAtomUpdate",
  data() {
    return {
      atomToUpdate: {},
      message: "",
      error: "",
    };
  },
  props: {
    atom: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapGetters(["getAtom"]),
    ...mapActions(["reviseAtom"]),
    loadData(data) {
      // ATTENTION!!!! shallow copy so that no vuex error
      let tmp = Object.assign({}, data);
      this.atomToUpdate = tmp;
    },
    async update() {
      // console.log(this.atomToUpdate.description)
      try {
        this.message = "";
        this.error = "";
        console.log("calling update");
        const response = await this.reviseAtom(this.atomToUpdate);
        if (response.status === 200) {
          this.message = "atom updated";
        } else {
          this.error = "atom not updated";
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
</style>