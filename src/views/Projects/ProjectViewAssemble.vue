<template>
  <div>
    <panel v-if="getAssemblableProducts.length != 0" title="Assembly">
      <v-text-field
        label="name"
        :rules="[rules.singleName, rules.required]"
        v-model="assembly.name"
        
      ></v-text-field>
      <v-text-field
        label="description"
        :rules="[rules.required]"
        v-model="assembly.description"
        
      ></v-text-field>
      <v-text-field
        label="quantity to assemble"
        :rules="[rules.required, rules.natural]"
        v-model="assembly.quantity_to_assemble"
        @input="resetQuantities"
        
      ></v-text-field>
      <div class="danger-alert" v-if="msg">{{msg}}</div>
      <v-btn class="cyan" @click="create">Create assembly</v-btn>
      <v-progress-circular class="ml-10" v-if="loading" :indeterminate="loading" color="light-blue"></v-progress-circular>
      <br />
      <span>parts checked: {{ assembly.parts }}</span>
      <br />
      <span>Quantities: {{ assembly.quantities }}</span>
      <br />
      <!-- solution see https://stackoverflow.com/questions/52691527/use-v-model-with-a-checkbox-when-v-for-is-used-with-properties-of-an-object-->
      <div v-for="(value, key, index) in assemblables" :key="index">
        <v-layout>
          <v-flex xs3>
            <div class="atom-name">{{value.name}} - pieces left: {{value.quantity_to_assemble}}</div>
            <input
              @click="toggleQuantity(key)"
              type="checkbox"
              :value="value.uuid"
              v-model="assembly.parts"
            />
            <br />
            <!-- <input
              v-if="assembly.parts.includes(value.uuid)"
              type="number"
              :id="key"
              min="1"
              max="100"
              step="1"
              v-model="assembly.quantities[key]"
            /> -->
            <v-text-field
              v-if="assembly.parts.includes(value.uuid)"
              :rules="[maxQuantity(value.quantity_to_assemble)]"
              type="number"
              min=1
              max=100
              step=1
              v-model="assembly.quantities[key]"
            />
          </v-flex>
          <v-flex xs2>
            <img class="atom-image" :src="value.imageUrl" />
          </v-flex>
        </v-layout>
      </div>
    </panel>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "ProjectViewAssemble",
  data() {
    return {
      assembly: {
        name: null,
        description: null,
        parts: [],
        quantities: [],
        quantity_to_assemble: 1,
        quantity: 1,
        version: "0.0.1",
        type: "child",
      },
      // indeterminate: false,
      msg: null,
      atoms: [],
      rules: {
        required: (value) => !!value || "Required.",
        natural: (value) => {
          const pattern = /^([1-9]\d*)$/;
          return pattern.test(value) || "entry must be a positive integer";
        },
        singleName: (value) =>
          !this.productNames.includes(value) || "name already taken!",
      },
    };
  },
  computed: {
    ...mapGetters([
      "getProject",
      "getAssemblableProducts",
      "getLoading",
      "getError",
      "getAllProductNames",
    ]),
    ...mapState({
      assemblables: (state) => state.projects.assemblableProducts,
      loading: (state) => state.projects.loading,
      productNames: (state) => state.projects.productNames,
    }),
  },
  created() {
    this.fetchAssemblableProducts(this.getProject.uuid);
    this.fetchAllProducts(this.getProject.uuid);
  },
  methods: {
    ...mapActions(["fetchAssemblableProducts", "assemble", "fetchAllProducts"]),
    ...mapMutations(["addProductName"]),
    maxQuantity(maxQty) {
      return (value) =>
        value * this.assembly.quantity_to_assemble <= maxQty ||
        "max quantity exceeded";
    },
    resetQuantities() {
      this.assembly.parts = []
      this.assembly.quantities = []
    },
    async create() {
      this.msg = null;
      const areAllFieldsFilledIn = Object.keys(this.assembly).every(
        (key) => !!this.assembly[key]
      );
      if (!areAllFieldsFilledIn) {
        this.msg = "Please fill in all the required fields.";
        return;
      }
      if (this.getAllProductNames.includes(this.assembly.name)) {
        this.msg = "Please change assembly name";
        return;
      }
      try {
        // allign parts elements with quantities elements: TODO find a better solution
        this.assembly.quantities = this.assembly.quantities.filter((n) => n);
        this.assembly.quantity = this.assembly.quantity_to_assemble;
        const ret = await this.assemble(this.assembly);
        // console.log(ret)
        if (ret == 201) {
          this.addProductName(this.assembly.name);
          this.assembly.name = "";
          this.assembly.description = "";
          this.assembly.parts = [];
          this.assembly.quantities = [];
          this.assembly.quantity_to_assemble = 1;
          this.assembly.quantity = 1;
        }
      } catch (error) {
        console.log(error);
      }
    },
    toggleQuantity: function (key) {
      if (this.assembly.quantities[key]) {
        this.assembly.quantities[key] = null;
      } else {
        this.assembly.quantities[key] = 1;
      }
    },
  },
};
</script>

<style scoped>
.danger-alert {
  color: red;
}
.atom-image {
  width: 100px;
  height: 100px;
}
</style>