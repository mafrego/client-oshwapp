<template>
  <div>
      <v-btn 
        color="blue" 
        @click="loadData(atom)"
        title="actual values"
        >
        <v-icon>refresh</v-icon>
      </v-btn>
    <v-layout column>
      <v-flex xs1>
        <v-text-field v-model="atomToUpdate.description" ></v-text-field>
        <v-text-field v-model="atomToUpdate.quantity" type="number" min="1"></v-text-field>

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
      error: ""
    };
  },
  props: {
      atom: {
          type: Object,
          required: true
      }
  },
  methods: {
    ...mapGetters(["getAtom"]),
    ...mapActions(["reviseAtom"]),
    loadData(data){
        // ATTENTION!!!! shallow copy so that no vuex error
        let tmp = Object.assign({}, data)
        this.atomToUpdate = tmp
    },
    async update() {
        // console.log(this.atomToUpdate.description)
      try {
          this.message = ""
          this.error = ""
        console.log("calling update");
        const response = await this.reviseAtom(this.atomToUpdate)
        if(response.status === 200){
            this.message = "atom updated"
        } else {
            this.error = "atom not updated"
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