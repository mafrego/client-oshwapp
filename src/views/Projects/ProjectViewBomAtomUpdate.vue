<template>
  <v-container fluid>
      <v-layout>
        <!-- name, code, quantity, imageUrl cannot be updated -->
        <v-text-field
          v-model="description"
          :rules="[rules.required, rules.isDescription]"
          label="description"
          outlined
          dense
        ></v-text-field>
      </v-layout>
      <v-layout wrap justify-space-between>
        <v-flex sm2>
          <v-text-field
            @keydown="preventNonNumericalInput($event)"
            type="number"
            min="1"
            v-model.number="moq"
            :rules="[rules.required, rules.isPositiveInt]"
            label="m.o.q."
            outlined
            dense
          ></v-text-field>
        </v-flex>
        <v-flex sm1>
          <v-text-field
            v-model="quantity"
            label="qty"
            outlined
            readonly
            dense
          ></v-text-field>
        </v-flex>
        <!-- update atom quantity_to_assemble that is quantity left  -->
        <!-- ATTENTION test this carefully!!! -->
              <!-- v-if="atom.quantity === atom.quantity_to_assemble" -->
        <v-flex sm2>
          <v-text-field
            @keydown="preventNonNumericalInput($event)"
            type="number"
            min="0"
            v-model.number="quantity_to_assemble"
            :rules="[rules.required, rules.isPositiveInt]"
            label="qty left"
            outlined
            dense
          ></v-text-field>
        </v-flex>
        <v-flex sm2 v-if="getAtom.quantity === getAtom.quantity_to_assemble">
          <v-text-field
            type="number"
            min="0"
            step="0.01"
            v-model.number="unitCost"
            :rules="[rules.required, rules.isPositiveFloat]"
            label="unit cost"
            outlined
            dense
          ></v-text-field>
        </v-flex>
        <v-flex sm2  v-if="getAtom.quantity != getAtom.quantity_to_assemble">
          <v-text-field
            :value="getAtom.unitCost"
            label="unit cost"
            outlined
            dense
            readonly
          ></v-text-field>
        </v-flex>
        <v-flex sm2>
          <v-text-field
            :value="getAtom.totalCost"
            label="total cost"
            outlined
            dense
            readonly
          ></v-text-field>
        </v-flex>
        <v-flex sm1>
          <v-text-field
            :value="getProject.currency"
            label="currency"
            outlined
            dense
            readonly
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout wrap justify-space-between>
        <v-flex v-if="GTIN" sm2>
          <v-text-field
            v-model="GTIN"
            :rules="[rules.isGTIN]"
            label="GTIN"
            outlined
            dense
          ></v-text-field>
        </v-flex>
        <v-flex v-if="!GTIN" sm2>
          <v-text-field
            v-model="addGTIN"
            :rules="[rules.isGTIN]"
            label="add GTIN"
            outlined
            dense
          ></v-text-field>
        </v-flex>
        <v-flex v-if="SKU" sm2>
          <v-text-field
            v-model="SKU"
            :rules="[rules.isSKU]"
            label="SKU"
            outlined
            dense
          ></v-text-field>
        </v-flex>
        <v-flex v-if="!SKU" sm2>
          <v-text-field
            v-model="addSKU"
            :rules="[rules.isSKU]"
            label="add SKU"
            outlined
            dense
          ></v-text-field>
        </v-flex>
        <v-flex v-if="vendorUrl" sm5>
          <v-text-field
            v-model="vendorUrl"
            :rules="[rules.isURL]"
            label="vendor URL"
            outlined
            dense
          ></v-text-field>
        </v-flex>
        <v-flex v-if="!vendorUrl" sm5>
          <v-text-field
            v-model="addVendorUrl"
            :rules="[rules.isURL]"
            label="add vendor URL"
            outlined
            dense
          ></v-text-field>
        </v-flex>
        <v-flex v-if="leadTime" sm2>
          <v-text-field
            v-model="leadTime"
            :rules="[rules.isDuration]"
            label="lead time"
            outlined
            dense
          ></v-text-field>
        </v-flex>
        <v-flex v-if="!leadTime" sm2>
          <v-text-field
            v-model="addLeadTime"
            :rules="[rules.isDuration]"
            label="add lead time"
            outlined
            dense
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout wrap justify-space-between>
        <v-flex v-if="link" sm4>
          <v-text-field
            v-model="link"
            :rules="[rules.isURL]"
            label="link"
            outlined
            dense
          ></v-text-field>
        </v-flex>
        <v-flex v-if="!link" sm4>
          <v-text-field
            v-model="addLink"
            :rules="[rules.isURL]"
            label="add link"
            outlined
            dense
          ></v-text-field>
        </v-flex>
        <v-flex v-if="notes" sm7>
          <v-text-field
            v-model="notes"
            :rules="[rules.isDescription]"
            label="notes"
            outlined
            dense
          ></v-text-field>
        </v-flex>
        <v-flex v-if="!notes" sm7>
          <v-text-field
            v-model="addNotes"
            :rules="[rules.isDescription]"
            label="add notes"
            outlined
            dense
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout wrap justify-space-between>
        <v-flex sm2>
          <v-btn class="yellow" @click="update()" title="save updates">
            <v-icon>save</v-icon>
          </v-btn>
        </v-flex>
        <v-flex sm1>
          <v-progress-circular
            class="ml-10"
            v-if="isLoading"
            :indeterminate="isLoading"
            color="light-blue"
          ></v-progress-circular>
        </v-flex>
        <v-flex sm9>
          <div v-if="this.message" class="ml-2 msg green--text">
            {{ message }}
          </div>
          <div v-if="error" class="red--text msg ml-2">{{ error }}</div>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AtomService from "@/services/AtomService";

export default {
  name: "ProjectViewBomAtomUpdate",
  data() {
    return {
      message: "",
      error: "",
      isLoading: false,
      addGTIN: null,
      addSKU: null,
      addVendorUrl: null,
      addLeadTime: null,
      addLink: null,
      addNotes: null,
      rules: {
        required: (value) => !!value || "Required.",
        isDescription: (value) => {
          const pattern = /^[^,;]+$/;
          if (value)
            return (
              pattern.test(value) || "any char except for commas and semicolons"
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
          if (value) return pattern.test(value) || "GTIN codes";
          else {
            this.GTIN = null
            this.addGTIN = null 
            return true;
          }
        },
        isSKU: (value) => {
          const pattern = /^[-a-zA-Z0-9_ ./]*$/;
          if (value) return pattern.test(value) || "alphanumeric";
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
          if (value) return pattern.test(value) || "int > 0";
          else return true;
        },
        isDuration: (value) => {
          const pattern = /^P(?!$)(\d+(?:\.\d+)?Y)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?W)?(\d+(?:\.\d+)?D)?(T(?=\d)(\d+(?:\.\d+)?H)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?S)?)?$/;
          if (value) return pattern.test(value) || "duration ISO 8601";
          else return true;
        },
      },
    };
  },
  computed: {
    ...mapGetters(["getAtom", "getProject"]),
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
      set(value) {
        this.$store.commit("updateAtomQuantityToAssemble", value);
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
    // currency: {
    //   get() {
    //     return this.$store.state.projects.atom.currency;
    //   },
    //   set(value) {
    //     this.$store.commit("updateAtomCurrency", value);
    //   },
    // },
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
    ...mapActions(["reviseAtom"]),
    // this function prevents Firefox from allowing chars other than digits
    preventNonNumericalInput(event) {
      const char = String.fromCharCode(event.keyCode);
      if (!/[0-9\b\t]/.test(char)) {
        event.preventDefault();
      }
    },
    preventNonFloatInput(event) {
      const char = String.fromCharCode(event.keyCode);
      if (!/[.0-9\b\t]/.test(char)) {
        event.preventDefault();
      }
    },
    calculateTotalCost(){
      if (this.moq == 1) {
        return this.unitCost * this.quantity;
      } else {
        if (this.moq >= this.quantity) {
          return this.unitCost;
        } else {
          return  Math.ceil(this.quantity / this.moq) * this.unitCost;
        }
      }
    },
    calculatePseudoUnitCost(){
      if(this.moq === 1){
        return this.unitCost
      } else {
        return this.calculateTotalCost() / this.quantity
      }
    },
    async update() {
      // console.log(this.atomToUpdate.description)
      this.message = "";
      this.error = "";
      // TODO check that required fields are filled in and that not required are set to null if empty
      if (
        // this.project.name &&
        this.description &&
        this.moq &&
        // this.quantity_to_assemble &&         //if set to 0 invalid 
        this.unitCost
        // this.currency
      ) {
        this.error = null;
      } else {
        this.error = "Please fill in all the required fields.";
        return;
      }
      const atom = {
        uuid: this.getAtom.uuid,
        description: this.description,
        moq: this.moq,
        quantity_to_assemble: this.quantity_to_assemble,
        quantity: this.quantity,
        unitCost: this.unitCost,
        pseudoUnitCost: this.calculatePseudoUnitCost()
      }
      // not required properties: GTIN, SKU, vendorUrl, leadTime, link, notes
      if (this.GTIN) {
        atom.GTIN = this.GTIN;
      } else if (this.addGTIN) {
        atom.GTIN = this.addGTIN;
      } else {
        atom.GTIN = null;
      }
      if (this.SKU) {
        atom.SKU = this.SKU;
      } else if (this.addSKU) {
        atom.SKU = this.addSKU;
      } else {
        atom.SKU = null;
      }
      if (this.vendorUrl) {
        atom.vendorUrl = this.vendorUrl;
      } else if (this.addVendorUrl) {
        atom.vendorUrl = this.addVendorUrl;
      } else {
        atom.vendorUrl = null;
      }
      if (this.leadTime) {
        atom.leadTime = this.leadTime;
      } else if (this.addLeadTime) {
        atom.leadTime = this.addLeadTime;
      } else {
        atom.leadTime = null;
      }
      if (this.link) {
        atom.link = this.link;
      } else if (this.addLink) {
        atom.link = this.addLink;
      } else {
        atom.link = null;
      }
      if (this.notes) {
        atom.notes = this.notes;
      } else if (this.addNotes) {
        atom.notes = this.addNotes;
      } else {
        atom.notes = null;
      }
      // add totalCost
      if (this.moq == 1) {
        atom.totalCost = this.unitCost * atom.quantity;
      } else {
        if (this.moq >= atom.quantity) {
          atom.totalCost = this.unitCost;
        } else {
          atom.totalCost =
            Math.ceil(atom.quantity / this.moq) * this.unitCost;
        }
      }
      try {
        // console.log('atom sent: ',atom)
      this.isLoading = true;
        const response = await AtomService.put(atom);
        if (response.status === 200) {
          // console.log('atom received: ',response.data);
          this.reviseAtom();
          this.message = "atom updated";
        }
      } catch (error) {
        this.error = error.response.data.message;
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
</style>