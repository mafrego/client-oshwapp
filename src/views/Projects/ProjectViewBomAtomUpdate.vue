<template>
  <div>
    <!-- <v-btn color="blue" @click="loadData(atom)" title="actual values">
      <v-icon>refresh</v-icon>
    </v-btn> -->
    <v-layout column>
      <v-flex xs1>
        <!-- name, code, quantity, imageUrl cannot be updated -->
        <v-text-field v-model="description" :rules="[rules.isDescription]" label="description"></v-text-field>
        <v-text-field v-model="cost" :rules="[rules.isPositiveFloat]" label="cost" ></v-text-field>
        <v-text-field v-model="currency" :rules="[rules.isCurrency]" label="currency"></v-text-field>
        <v-text-field v-model="link" :rules="[rules.isURL]" label="link"></v-text-field>
        <v-text-field v-model="vendorUrl" :rules="[rules.isURL]" label="vendor"></v-text-field>
        <v-text-field v-model="moq" :rules="[rules.isPositiveInt]" label="mimimum quantity order"></v-text-field>
        <v-text-field v-model="leadTime" :rules="[rules.isDuration]" label="lead time"></v-text-field>
        <v-text-field v-model="material" :rules="[rules.isAlphanumeric]" label="material"></v-text-field>
        <v-text-field v-model="weight" :rules="[rules.isPositiveFloat]" label="weight"></v-text-field>
        <v-text-field v-model="notes" :rules="[rules.isDescription]" label="notes"></v-text-field>

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
      message: "",
      error: "",
      rules: {
        required: (value) => !!value || "Required.",
        isDescription: (value) => {
          const pattern = /^[-a-zA-Z0-9 _.]*$/;
          if(value) return pattern.test(value) || "Only alphanumeric, dots, hyphens, underscore chars";
          else return true
        },
        isAlphanumeric: (value) => {
          const pattern = /^[a-zA-Z0-9_]*$/;
          if(value) return pattern.test(value) || "Only alphanumeric, dots, hyphens, underscore chars";
          else return true
        },
        isCurrency: (value) => {
          const pattern = /[A-Z]{3}/;
          if(value) return pattern.test(value) || "only currency ISO 4217";
          else return true
        },
        isURL: (value) => {
          const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
          if(value) return pattern.test(value) || "invalid URL";
          else return true
        },
        isPositiveFloat: (value) => {
          const pattern = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/;
          if(value) return pattern.test(value) || "only positive float";
          else return true
        },
        isPositiveInt: (value) => {
          const pattern = /^[1-9]+[0-9]*$/;
          if(value) return pattern.test(value) || "only positive integers > 0";
          else return true
        },
        isDuration: (value) => {
          const pattern = /^P(?!$)(\d+(?:\.\d+)?Y)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?W)?(\d+(?:\.\d+)?D)?(T(?=\d)(\d+(?:\.\d+)?H)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?S)?)?$/;
          if(value) return pattern.test(value) || "only duration ISO 8601";
          else return true
        }
      }
    };
  },
  computed: {
      description: {
        get() {
          return this.$store.state.projects.atom.description
        },
        set (value) {
          this.$store.commit('updateAtomDescription', value)
        }
      },
      cost: {
        get() {
          return this.$store.state.projects.atom.cost
        },
        set (value) {
          this.$store.commit('updateAtomCost', value)
        }
      },
      currency: {
        get() {
          return this.$store.state.projects.atom.currency
        },
        set (value) {
          this.$store.commit('updateAtomCurrency', value)
        }
      },
      link: {
        get() {
          return this.$store.state.projects.atom.link
        },
        set (value) {
          this.$store.commit('updateAtomLink', value)
        }
      },
      vendorUrl: {
        get() {
          return this.$store.state.projects.atom.vendorUrl
        },
        set (value) {
          this.$store.commit('updateAtomVendorURL', value)
        }
      },
      moq: {
        get() {
          return this.$store.state.projects.atom.moq
        },
        set (value) {
          this.$store.commit('updateAtomMOQ', value)
        }
      },
      leadTime: {
        get() {
          return this.$store.state.projects.atom.leadTime
        },
        set (value) {
          this.$store.commit('updateAtomLeadTime', value)
        }
      },
      material: {
        get() {
          return this.$store.state.projects.atom.material
        },
        set (value) {
          this.$store.commit('updateAtomMaterial', value)
        }
      },
      weight: {
        get() {
          return this.$store.state.projects.atom.weight
        },
        set (value) {
          this.$store.commit('updateAtomWeight', value)
        }
      },
      notes: {
        get() {
          return this.$store.state.projects.atom.notes
        },
        set (value) {
          this.$store.commit('updateAtomNotes', value)
        }
      },
  },
  methods: {
    ...mapGetters(["getAtom"]),
    ...mapActions(["reviseAtom"]),
    async update() {
      // console.log(this.atomToUpdate.description)
      try {
        this.message = "";
        this.error = "";
        const response = await this.reviseAtom();
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