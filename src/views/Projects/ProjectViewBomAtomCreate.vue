<template>
  <div>
    <panel title="Create atom">
      <v-form ref="form">
        <v-text-field
          label="name"
          :rules="[rules.required, rules.isAlphanumeric, rules.uniqueName]"
          v-model="atom.name"
        ></v-text-field>
        <v-text-field
          label="description"
          :rules="[rules.required, rules.isDescription]"
          v-model="atom.description"
        ></v-text-field>
        <v-text-field
          @keydown="preventNonNumericalInput($event)"
          type="number"
          min="1"
          label="minimum order quantity"
          :rules="[rules.required, rules.isPositiveInt]"
          v-model="atom.moq"
        ></v-text-field>
        <v-text-field
          @keydown="preventNonNumericalInput($event)"
          type="number"
          min="1"
          label="quantity"
          :rules="[rules.required, rules.isPositiveInt]"
          v-model="atom.quantity"
        ></v-text-field>
        <v-text-field
          label="unit cost"
          :rules="[rules.required, rules.isPositiveFloat]"
          v-model="atom.unitCost"
        ></v-text-field>
        <v-text-field
          label="currency"
          :rules="[rules.required, rules.isCurrency]"
          v-model="atom.currency"
        ></v-text-field>
        <v-text-field label="GTIN" :rules="[rules.isAlphanumeric]" v-model="atom.GTIN"></v-text-field>
        <v-text-field label="SKU" :rules="[rules.isAlphanumeric]" v-model="atom.SKU"></v-text-field>
        <v-text-field label="vendor URL" :rules="[rules.isHTTP]" v-model="atom.vendorUrl"></v-text-field>
        <v-text-field label="lead time" :rules="[rules.isDuration]" v-model="atom.leadTime"></v-text-field>
        <v-text-field label="link" :rules="[rules.isHTTP]" v-model="atom.link"></v-text-field>
        <v-text-field label="notes" :rules="[rules.isDescription]" v-model="atom.notes"></v-text-field>
      </v-form>
    </panel>
    <div class="green--text" v-if="message">{{message}}</div>
    <div class="red--text" v-if="error">{{error}}</div>
    <v-btn class="green" @click="create" title="save atom">
      <v-icon>save</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProjectViewBomAtomCreate",
  data() {
    return {
      atom: {
        itemNumber: null,
        quantity_to_assemble: null,
      },
      message: "",
      error: "",
      rules: {
        required: (value) => !!value || "Required.",
        // counter: (value) => value.length >= 8 || "Min 8 characters",
        // email: (value) => {
        //   const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //   return pattern.test(value) || "Invalid e-mail.";
        // },
        uniqueName: (value) =>
          !this.getAtomNames.includes(value) || "name already taken!",
        isDescription: (value) => {
          const pattern = /^[^,;]+$/;
          if (value)
            return pattern.test(value) || "any char but commas and semicolons";
          else return true;
        },
        isCurrency: (value) => {
          const pattern = /[A-Z]{3}/;
          if (value)
            return (
              pattern.test(value) || "only currency ISO 4217 e.g. EUR, USD"
            );
          else return true;
        },
        isAlphanumeric: (value) => {
          const pattern = /^[-0-9a-zA-Z_]+$/;
          if (value)
            return (
              pattern.test(value) || "only alphanumeric hyphens underscores"
            );
          else return true;
        },
        isHTTP: (value) => {
          const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
          if (value) return pattern.test(value) || "Invalid HTTP link";
          else return true;
        },
        isPositiveFloat: (value) => {
          const pattern = /^[+-]?\d+(\.\d+)?$/;
          if (value) return pattern.test(value) || "Invalid float";
          else return true;
        },
        isPositiveInt: (value) => {
          const pattern = /^[1-9]+[0-9]*$/;
          if (value) return pattern.test(value) || "only positive integer > 0";
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
    ...mapGetters(["getAtomNames", "getBom"]),
  },
  methods: {
    ...mapActions(["createAtom"]),
    preventNonNumericalInput(event) {
      const char = String.fromCharCode(event.keyCode);
      if (!/[0-9\b\t]/.test(char)) {
        event.preventDefault();
      }
    },
    async create() {
      this.message = "";
      this.error = "";
      if (
        this.atom.name &&
        this.atom.description &&
        this.atom.moq &&
        this.atom.quantity &&
        this.atom.unitCost &&
        this.atom.currency
      ) {
        this.error = null;
      } else {
        this.error = "Please fill in all the required fields.";
        return;
      }
      this.atom.quantity_to_assemble = this.atom.quantity;
      
      if (this.getBom.length === 0) {
        this.atom.itemNumber = 100000;
      } else {
        this.atom.itemNumber = this.getBom[this.getBom.length - 1].itemNumber + 1;
      }

      const response = await this.createAtom(this.atom);
      if (response.status === 201) {
        this.message = "added new atom to BOM";

        this.atom.name = null;
        this.atom.description = null;
        this.atom.moq = null;
        this.atom.quantity = null;
        this.atom.unitCost = null;
        this.atom.currency = null;
        this.$refs.form.resetValidation();
      } else {
        this.error = "problems in creating new atom";
      }
    },
  },
};
</script>

<style scoped>
</style>