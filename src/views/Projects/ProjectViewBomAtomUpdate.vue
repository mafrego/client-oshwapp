<template>
  <div>
    <!-- <v-btn color="blue" @click="loadData(atom)" title="actual values">
      <v-icon>refresh</v-icon>
    </v-btn>-->
    <v-layout column>
      <v-flex xs1>
        <!-- name, code, quantity, imageUrl cannot be updated -->
        <v-text-field v-model="description" :rules="[rules.isDescription]" label="description"></v-text-field>
        <v-text-field
          @keydown="preventNonNumericalInput($event)"
          v-model="moq"
          :rules="[rules.isPositiveInt]"
          label="mimimum quantity order"
          type="number"
          min="1"
        ></v-text-field>
        <v-text-field
          v-if="quantity === quantity_to_assemble"
          v-model="quantity"
          :rules="[rules.isPositiveInt]"
          label="quantity"
        ></v-text-field>
        <v-text-field v-model="unitCost" :rules="[rules.isPositiveFloat]" label="unit cost"></v-text-field>
        <v-text-field v-model="currency" :rules="[rules.isCurrency]" label="currency"></v-text-field>
        <v-text-field v-model="GTIN" :rules="[rules.isGTIN]" label="GTIN"></v-text-field>
        <v-text-field v-model="SKU" :rules="[rules.isSKU]" label="SKU"></v-text-field>
        <v-text-field v-model="vendorUrl" :rules="[rules.isURL]" label="vendor URL"></v-text-field>
        <v-text-field v-model="leadTime" :rules="[rules.isDuration]" label="lead time"></v-text-field>
        <v-text-field v-model="link" :rules="[rules.isURL]" label="link"></v-text-field>
        <v-text-field v-model="notes" :rules="[rules.isDescription]" label="notes"></v-text-field>

        <v-btn class="yellow" @click="update()" title="save updates">
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
          const pattern = /[^,;]*$/;
          if (value)
            return (
              pattern.test(value) ||
              "Only alphanumeric, dots, hyphens, underscore chars"
            );
          else return true;
        },
        isAlphanumeric: (value) => {
          const pattern = /^[-a-zA-Z0-9_]*$/;
          if (value)
            return (
              pattern.test(value) ||
              "Only alphanumeric, dots, hyphens, underscore chars"
            );
          else return true;
        },
        isCurrency: (value) => {
          const pattern = /[A-Z]{3}/;
          if (value) return pattern.test(value) || "only currency ISO 4217";
          else return true;
        },
        isGTIN: (value) => {
          const pattern = /^(\d{8}|\d{12}|\d{13}|\d{14})$/;
          if (value)
            return (
              pattern.test(value) || "only GTIN codes 8,12,13 or 14 digits"
            );
          else return true;
        },
        isSKU: (value) => {
          const pattern = /^[-a-zA-Z0-9_ ./]*$/;
          if (value)
            return (
              pattern.test(value) ||
              "Only alphanumeric, dots, hyphens, underscore chars"
            );
          else return true;
        },
        isURL: (value) => {
          const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
          if (value) return pattern.test(value) || "invalid URL";
          else return true;
        },
        isPositiveFloat: (value) => {
          const pattern = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/;
          if (value) return pattern.test(value) || "only positive float";
          else return true;
        },
        isPositiveInt: (value) => {
          const pattern = /^[1-9]+[0-9]*$/;
          if (value) return pattern.test(value) || "only positive integers > 0";
          else return true;
        },
        isDuration: (value) => {
          const pattern = /^P(?!$)(\d+(?:\.\d+)?Y)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?W)?(\d+(?:\.\d+)?D)?(T(?=\d)(\d+(?:\.\d+)?H)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?S)?)?$/;
          if (value) return pattern.test(value) || "only duration ISO 8601";
          else return true;
        },
      },
    };
  },
  computed: {
    description: {
      get() {
        return this.$store.state.projects.atom.description;
      },
      set(value) {
        this.$store.commit("updateAtomDescription", value);
      },
    },
    quantity: {
      get() {
        return this.$store.state.projects.atom.quantity;
      },
      set(value) {
        this.$store.commit("updateAtomQuantity", value);
      },
    },
    quantity_to_assemble: {
      get() {
        return this.$store.state.projects.atom.quantity_to_assemble;
      },
    },
    unitCost: {
      get() {
        return this.$store.state.projects.atom.unitCost;
      },
      set(value) {
        this.$store.commit("updateAtomUnitCost", value);
      },
    },
    currency: {
      get() {
        return this.$store.state.projects.atom.currency;
      },
      set(value) {
        this.$store.commit("updateAtomCurrency", value);
      },
    },
    link: {
      get() {
        return this.$store.state.projects.atom.link;
      },
      set(value) {
        this.$store.commit("updateAtomLink", value);
      },
    },
    GTIN: {
      get() {
        return this.$store.state.projects.atom.GTIN;
      },
      set(value) {
        this.$store.commit("updateAtomGTIN", value);
      },
    },
    SKU: {
      get() {
        return this.$store.state.projects.atom.SKU;
      },
      set(value) {
        this.$store.commit("updateAtomSKU", value);
      },
    },
    vendorUrl: {
      get() {
        return this.$store.state.projects.atom.vendorUrl;
      },
      set(value) {
        this.$store.commit("updateAtomVendorURL", value);
      },
    },
    moq: {
      get() {
        return this.$store.state.projects.atom.moq;
      },
      set(value) {
        this.$store.commit("updateAtomMOQ", value);
      },
    },
    leadTime: {
      get() {
        return this.$store.state.projects.atom.leadTime;
      },
      set(value) {
        this.$store.commit("updateAtomLeadTime", value);
      },
    },
    material: {
      get() {
        return this.$store.state.projects.atom.material;
      },
      set(value) {
        this.$store.commit("updateAtomMaterial", value);
      },
    },
    weight: {
      get() {
        return this.$store.state.projects.atom.weight;
      },
      set(value) {
        this.$store.commit("updateAtomWeight", value);
      },
    },
    notes: {
      get() {
        return this.$store.state.projects.atom.notes;
      },
      set(value) {
        this.$store.commit("updateAtomNotes", value);
      },
    },
  },
  methods: {
    ...mapGetters(["getAtom"]),
    ...mapActions(["reviseAtom"]),
    // this function prevents Firefox from allowing chars other than digits
    preventNonNumericalInput(event) {
      const char = String.fromCharCode(event.keyCode)
      if (!/[0-9\b]/.test(char)) {
        event.preventDefault()
      }
    },
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