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
        @input="recomputeQuantities"
        
      />
      <div class="danger-alert" v-if="msg">{{msg}}</div>
      <div class="danger-alert" v-if="overlimits.length != 0">{{overlimits.join(", ")}}</div>
      <v-btn class="cyan" @click="startAssembling">assemble</v-btn>
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
              @input="setValue(item, index)"
              
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
        quantity_to_assemble: 1,
        version: "0.0.1",
        type: "child",
      },
      quantities: [],
      msg: null,
      overlimits: [],
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
    // TODO find substitute with getters and remove states
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
    ...mapActions(["fetchAssemblableProducts", "assembleCopy", "fetchAllProducts"]),
    ...mapMutations(["addProductName"]),
    
    maxQuantity(maxQty) {
      return (value) =>
        value * this.assembly.quantity_to_assemble <= maxQty ||
        "not enough pieces!";
    },
    // TODO refactor this function to make it work with the new arrays
    async startAssembling() {
      this.msg = null;
      const areAllFieldsFilledIn = Object.keys(this.assembly).every(
        (key) => !!this.assembly[key]
      );
      if (!areAllFieldsFilledIn) {
        this.msg = "Please fill in all the required fields";
        return;
      }
      if (this.getAllProductNames.includes(this.assembly.name)) {
        this.msg = "Please change assembly name";
        return;
      }
      if (this.overlimits.length != 0 ) {
        this.msg = "Please check if there are enough pieces"
        return;
      }
      if (this.assembly.parts.length == 0){
        this.msg = "Please select parts to assemble!"
        return
      }
      try {
        this.assembly.parts = this.assembly.parts.filter(el => {return el != null})
        const ret = await this.assembleCopy(this.assembly);
        if (ret == 201) {
          // check if following line is necessary
          this.addProductName(this.assembly.name);
          this.assembly.name = "";
          this.assembly.description = "";
          this.assembly.parts = [];
          this.assembly.quantity_to_assemble = 1;
          this.quantities = [];
        }
      } catch (error) {
        console.log(error);
      }
    },
    setValue(item, index) {
      // remove object from parts if its quantity == 0
      if(this.quantities[index] == 0){
        this.assembly.parts.splice(index, 1)
        return
      }
      this.assembly.parts[index] = {
        uuid: item.uuid,
        name: item.name,
        quantity_to_assemble: item.quantity_to_assemble,
        quantity_single: this.quantities[index],
        quantity_total: this.quantities[index] * this.assembly.quantity_to_assemble,
      };
    },
    recomputeQuantities() {
      this.overlimits = []
      if (this.assembly.quantity_to_assemble == 0) return;
      else {
        this.assembly.parts = this.assembly.parts.map((el) => {
          if (el != null) {
            const total = el.quantity_single * this.assembly.quantity_to_assemble
            if(total > el.quantity_to_assemble){
              this.overlimits.push(`${el.name} has not enough pieces left`)
            }
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