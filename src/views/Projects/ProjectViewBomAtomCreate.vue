<template>
  <div>
    <panel title="atom data">
      <v-container fluid>
        <v-form ref="form">
          <v-layout row justify-space-between>
            <v-flex sm3>
              <v-text-field
                label="name"
                :rules="[rules.required, rules.isAlphanumeric, rules.uniqueName]"
                v-model="atom.name"
                solo-inverted
                dense
                hint="name"
              ></v-text-field>
            </v-flex>
            <v-flex sm8>
              <v-text-field
                label="description"
                :rules="[rules.required, rules.isDescription]"
                v-model="atom.description"
                solo-inverted
                dense
                hint="description"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row justify-space-between>
            <v-flex sm2>
              <v-text-field
                @keydown="preventNonNumericalInput($event)"
                type="number"
                min="1"
                label="m.o.q."
                :rules="[rules.required, rules.isPositiveInt]"
                v-model.number="atom.moq"
                solo-inverted
                dense
                hint="m.o.q"
              ></v-text-field>
            </v-flex>
            <v-flex sm2>
              <v-text-field
                @keydown="preventNonNumericalInput($event)"
                type="number"
                min="1"
                label="quantity"
                :rules="[rules.required, rules.isPositiveInt]"
                v-model.number="atom.quantity"
                solo-inverted
                dense
                hint="quantity"
              ></v-text-field>
            </v-flex>
            <v-flex sm2>
              <v-text-field
                label="unit cost"
                :rules="[rules.required, rules.isPositiveFloat]"
                v-model="atom.unitCost"
                solo-inverted
                dense
                hint="unit cost"
              ></v-text-field>
            </v-flex>
            <v-flex sm2>
              <v-text-field
                @keypress="calculateTotalCost()"
                @mouseover="calculateTotalCost()"
                @keyup="calculateTotalCost()"
                :value="atom.totalCost"
                label="total cost"
                solo-inverted
                dense
                readonly
                hint="total cost"
              ></v-text-field>
            </v-flex>
            <v-flex sm1>
              <v-text-field
                :value="getProject.currency"
                solo-inverted
                dense
                readonly
                hint="currency"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row justify-space-between>
            <v-flex sm2>
              <v-text-field
                label="GTIN"
                :rules="[rules.isGTIN]"
                v-model="atom.GTIN"
                solo-inverted
                dense
                hint="GTIN"
              ></v-text-field>
            </v-flex>
            <v-flex sm2>
              <v-text-field
                label="SKU"
                :rules="[rules.isAlphanumeric]"
                v-model="atom.SKU"
                solo-inverted
                dense
                hint="SKU"
              ></v-text-field>
            </v-flex>
            <v-flex sm5>
              <v-text-field
                label="vendor URL"
                :rules="[rules.isHTTP]"
                v-model="atom.vendorUrl"
                solo-inverted
                dense
                hint="vendor URL"
              ></v-text-field>
            </v-flex>
            <v-flex sm2>
              <v-text-field
                label="lead time"
                :rules="[rules.isDuration]"
                v-model="atom.leadTime"
                solo-inverted
                dense
                hint="lead time"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row justify-space-between>
            <v-flex sm4>
              <v-text-field
                label="link"
                :rules="[rules.isHTTP]"
                v-model="atom.link"
                solo-inverted
                dense
                hint="link"
              ></v-text-field>
            </v-flex>
            <v-flex sm7>
              <v-text-field
                label="notes"
                :rules="[rules.isDescription]"
                v-model="atom.notes"
                solo-inverted
                dense
                hint="notes"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row justify-space-between>
            <v-flex sm1>
              <v-btn class="green" @click="create" title="save atom">
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
              <div class="green--text" v-if="message">{{message}}</div>
              <div class="red--text" v-if="error">{{error}}</div>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </panel>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AtomService from "@/services/AtomService";

export default {
  name: "ProjectViewBomAtomCreate",
  data() {
    return {
      atom: {
        itemNumber: null,
        quantity_to_assemble: null,
        moq: null,
        unitCost: null,
        totalCost: null,
        quantity: null,
      },
      message: "",
      error: "",
      isLoading: false,
      rules: {
        required: (value) => !!value || "Required.",
        // counter: (value) => value.length >= 8 || "Min 8 characters",
        uniqueName: (value) =>
          !this.getAtomNames.includes(value) || "name not available!",
        isDescription: (value) => {
          const pattern = /^[^,;]+$/;
          if (value)
            return pattern.test(value) || "any char except for commas and semicolons";
          else return true;
        },
        isCurrency: (value) => {
          const pattern = /[A-Z]{3}/;
          if (value) return pattern.test(value) || "ISO 4217 e.g. EUR, USD";
          else return true;
        },
        isAlphanumeric: (value) => {
          const pattern = /^[-0-9a-zA-Z_]+$/;
          if (value) return pattern.test(value) || "only alphanumeric";
          else return true;
        },
        isHTTP: (value) => {
          const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
          if (value) return pattern.test(value) || "invalid HTTP link";
          else return true;
        },
        isGTIN: (value) => {
          const pattern = /^(\d{8}|\d{12}|\d{13}|\d{14})$/;
          if (value) return pattern.test(value) || "invalid GTIN";
          else {
            this.atom.GTIN = null
            return true;
          }
        },
        isPositiveFloat: (value) => {
          const pattern = /^[+-]?\d+(\.\d+)?$/;
          if (value) return pattern.test(value) || "invalid float";
          else return true;
        },
        isPositiveInt: (value) => {
          const pattern = /^[1-9]+[0-9]*$/;
          if (value) return pattern.test(value) || "positive integer";
          else return true;
        },
        isDuration: (value) => {
          const pattern = /^P(?!$)(\d+(?:\.\d+)?Y)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?W)?(\d+(?:\.\d+)?D)?(T(?=\d)(\d+(?:\.\d+)?H)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?S)?)?$/;
          if (value) return pattern.test(value) || "duration ISO 8601";
          else{ 
            this.atom.leadTime = null 
            return true;
          }
        },
      },
    };
  },
  computed: {
    ...mapGetters(["getAtomNames", "getBom", "getProject", "getAssembliesNames"]),
  },
  methods: {
    ...mapActions(["createAtom", "updateProjectState"]),
    preventNonNumericalInput(event) {
      const char = String.fromCharCode(event.keyCode);
      if (!/[0-9\b\t]/.test(char)) {
        event.preventDefault();
      }
    },
    calculateTotalCost(){
      if (this.atom.moq == 1) {
        this.atom.totalCost = this.atom.unitCost * this.atom.quantity;
      } else {
        if (this.atom.moq >= this.atom.quantity) {
          this.atom.totalCost = this.atom.unitCost;
        } else {
          this.atom.totalCost =
            Math.ceil(this.atom.quantity / this.atom.moq) * this.atom.unitCost;
        }
      }
    },
    calculatePseudoUnitCost(){
      if (this.atom.moq == 1) {
        this.atom.pseudoUnitCost = this.atom.unitCost
      } else {
        this.atom.pseudoUnitCost = this.atom.totalCost / this.atom.quantity
      }
    },
    async create() {
      this.message = "";
      this.error = "";
      // check that atom name is unique among atoms and assemblies
      if(this.getAtomNames.includes(this.atom.name) || this.getAssembliesNames.includes(this.atom.name)){
        this.error = "name not available!"
        return
      }
      if (
        this.atom.name &&
        this.atom.description &&
        this.atom.moq &&
        this.atom.quantity &&
        this.atom.unitCost
      ) {
        this.error = null;
      } else {
        this.error = "Please fill in all the required fields.";
        return;
      }
      // set to null not required properties if empty otherwise error in Neo4j
      if(this.atom.SKU === ""){
        this.atom.SKU = null
      }
      if(this.atom.vendorUrl === ""){
        this.atom.vendorUrl = null
      }
      if(this.atom.link === ""){
        this.atom.link = null
      }
      if(this.atom.notes === ""){
        this.atom.notes = null
      }
      this.atom.quantity_to_assemble = this.atom.quantity;
      // add itemNumber
      if (this.getBom.length === 0) {
        this.atom.itemNumber = 100000;
      } else {
        this.atom.itemNumber =
          this.getBom[this.getBom.length - 1].itemNumber + 1;
      }
      // costs and currency
      this.atom.currency = this.getProject.currency
      this.calculateTotalCost()
      this.calculatePseudoUnitCost()
      try {
        this.isLoading = true;
        const response = await AtomService.addAtomToBom(
          this.atom,
          this.getProject.uuid
        );
        // console.log(response);
        if (response.status === 201) {
          this.createAtom(response.data);
          if (this.getProject.state === "created") {
            this.updateProjectState({ state: "assembling" });
          }
          this.message = "added new atom to BOM";
          this.atom.name = null;
          this.atom.description = null;
          this.atom.moq = null;
          this.atom.quantity = null;
          this.atom.unitCost = null;
          this.atom.currency = null;
          this.$refs.form.resetValidation();
        }
      } catch (error) {
        this.error = error.response.data.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
</style>