<template>
  <div>
    <panel v-if="getAssemblableProducts.length != 0" title="Assembly Copy">
      <v-text-field
        label="name"
        :rules="[rules.singleName, rules.required]"
        v-model="assembly.name"
      ></v-text-field>
      <v-text-field label="description" :rules="[rules.required]" v-model="assembly.description"></v-text-field>
      <v-text-field
        label="quantity to assemble"
        :rules="[rules.required]"
        type="number"
        min="1"
        v-model="assembly.quantity_to_assemble"
        @click="recomputeQuantities"
      />
      <div class="danger-alert" v-if="msg">{{msg}}</div>
      <v-btn class="cyan" @click="create">Create assembly</v-btn>
      <v-progress-circular class="ml-10" v-if="loading" :indeterminate="loading" color="light-blue"></v-progress-circular>
      <br />
      <span>assembly.parts: {{ assembly.parts }}</span>
      <br />
      <span>quantities: {{ quantities }}</span>
      <br />
      <div v-for="(item, index) in assemblables" :key="index">
        <v-layout>
          <v-flex xs3>
            <div class="atom-name">{{item.name}} - pieces left: {{item.quantity_to_assemble}}</div>
            <!-- probably I don't need the checkbox -->
            <!-- <input
              type="checkbox"
              :value="{ uuid: item.uuid, quantity: quantities[index]}"
              v-model="assembly.parts"
            />
            <br /> -->

            <!-- maybe add item.name as parameter of setValue for debugging -->
            <v-text-field
              :rules="[maxQuantity(item.quantity_to_assemble)]"
              type="number"
              min="0"
              max="100"
              step="1"
              v-model="quantities[index]"
              @input="setValue(item.uuid, index)"
            />
          </v-flex>
          <v-flex xs2>
            <img class="atom-image" :src="item.imageUrl" />
          </v-flex>
        </v-layout>
      </div>
    </panel>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
1;
export default {
  name: "ProjectViewAssembleCopy",
  data() {
    return {
      assembly: {
        name: null,
        description: null,
        parts: [],
        // quantities: [],
        quantity_to_assemble: 1,
        // quantity: 1,
        version: "0.0.1",
        type: "child",
      },
      qty: null,
      quantities: [],
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
    // ATTENTION check this function
    maxQuantity(maxQty) {
      return (value) =>
        value * this.assembly.quantity_to_assemble <= maxQty ||
        "max quantity exceeded";
    },
    // TODO refactor this function to make it work with the new arrays
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
        // this.assembly.quantities = this.assembly.quantities.filter((n) => n);
        this.assembly.quantity = this.assembly.quantity_to_assemble;
        const ret = await this.assemble(this.assembly);
        // console.log(ret)
        if (ret == 201) {
          this.addProductName(this.assembly.name);
          this.assembly.name = "";
          this.assembly.description = "";
          this.assembly.parts = [];
          // this.assembly.quantities = [];
          this.assembly.quantity_to_assemble = 1;
          this.assembly.quantity = 1;
        }
      } catch (error) {
        console.log(error);
      }
    },
    //ATTENTION it breaks the logic, find another solution to remove element from array of parts
    // maybe remove this function
    toggleQuantity: function (key) {
      if (this.quantities[key]) {
        this.quantities[key] = null;
      } else {
        this.quantities[key] = 1;
      }
    },
    setValue(uuid, index) {
      // TODO if this.quantities[index] == 0 or null remove item from parts and return
      if(this.quantities[index] == 0){
        const ret = this.assembly.parts.splice(index, 1)
        console.log("element removed: ")
        console.log(ret[0])
        return
      }
      this.assembly.parts[index] = {
        uuid: uuid,
        quantity_single: this.quantities[index],
        quantity_total: this.quantities[index] * this.assembly.quantity_to_assemble,
      };
    },
    recomputeQuantities() {
      if (this.assembly.quantity_to_assemble == 0) return;
      else {
        this.assembly.parts = this.assembly.parts.map((el) => {
          if (el != null) {
            el.quantity_total = el.quantity_single * this.assembly.quantity_to_assemble;
          }
          return el;
        });
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