<template>
  <div>
    <div v-if="getProject.state == 'rooted'">
      <!-- make new component to display toggling it?? -->
      <img
        src="https://oshwapp.s3.eu-central-1.amazonaws.com/service/openproject.svg"
        class="openproject"
      />
      <v-btn color="blue">release</v-btn>
    </div>
    <br />
    <panel v-if="getAssemblableProducts.length" title="Assembly panel">
      <v-form ref="form">
        <div v-if="getProject.state != 'rooted'">
          <v-text-field
            label="name"
            :rules="[rules.singleName, rules.required, rules.string]"
            v-model="assembly.name"
          ></v-text-field>
          <v-text-field
            label="description"
            :rules="[rules.required]"
            v-model="assembly.description"
          ></v-text-field>
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
          <v-progress-circular
            class="ml-10"
            v-if="getLoading"
            :indeterminate="getLoading"
            color="light-blue"
          ></v-progress-circular>
          <br />
          <span>assembly.parts: {{ assembly.parts }}</span>
          <br />
          <span>quantities: {{ quantities }}</span>
          <br />
          <span>overlimits: {{ this.overlimits }}</span>
          <br />
        </div>

        <div v-for="(item, index) in getAssemblableProducts" :key="index">
          <v-layout>
            <v-flex xs3>
              <div class="atom-name">{{item.name}} - pieces left: {{item.quantity_to_assemble}}</div>
              <v-text-field
                :rules="[maxQuantity(item.quantity_to_assemble)]"
                type="number"
                min="0"
                max="100"
                step="1"
                v-model="quantities[index]"
                @input="setValue(item, index); recomputeQuantities();"
              />
            </v-flex>
            <v-flex xs2>
              <img class="atom-image" :src="item.imageUrl" />
            </v-flex>
            <v-flex xs1>
              <v-btn
                v-if="!item._labels.includes('Atom')"
                color="blue"
                @click="takeApart(item.uuid)"
              >disassemble</v-btn>
            </v-flex>
          </v-layout>
        </div>
      </v-form>
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
        quantity: 1,
        version: "0.0.1",
        type: "child",
      },
      quantities: [],
      msg: null,
      overlimits: [], //used for storing errror messages
      rules: {
        required: (value) => !!value || "Required.",
        natural: (value) => {
          const pattern = /^([1-9]\d*)$/;
          return pattern.test(value) || "entry must be a positive integer";
        },
        singleName: (value) =>
          !this.getAllProductNames.includes(value) || "name already taken!",
        string: (value) => {
          const pattern = /^[0-9a-zA-Z_]+$/;
          return (
            pattern.test(value) ||
            "only alphanumericals and underscores allowed"
          );
        },
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
      // assemblables: (state) => state.projects.assemblableProducts,
      loading: (state) => state.projects.loading,
      // productNames: (state) => state.projects.productNames,
    }),
  },
  created() {
    this.fetchAssemblableProducts(this.getProject.uuid);
    this.fetchAllProducts(this.getProject.uuid);
  },
  methods: {
    ...mapActions([
      "fetchAssemblableProducts",
      "assembleCopy",
      "fetchAllProducts",
      "disassemble",
    ]),
    ...mapMutations(["addProductName"]),

    maxQuantity(maxQty) {
      return (value) =>
        value * this.assembly.quantity_to_assemble <= maxQty ||
        "not enough pieces!";
    },
    async takeApart(uuid) {
      await this.disassemble(uuid);
    },
    async startAssembling() {
      this.msg = null;
      this.assembly.parts = this.assembly.parts.filter((el) => {
        return el != null;
      });
      this.assembly.quantity = this.assembly.quantity_to_assemble;
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
      if (this.overlimits.length != 0) {
        this.msg = "Please check part quantities and try again!"
        return;
      }
      if (this.assembly.parts.length === 0) {
        this.msg = "Please select parts to assemble!";
        return;
      }
      try {
        const ret = await this.assembleCopy(this.assembly);
        if (ret == 201) {
          // check if following line is necessary
          this.addProductName(this.assembly.name);
          this.assembly.name = null;
          this.assembly.description = null;
          this.assembly.parts = [];
          this.assembly.quantity_to_assemble = 1;
          this.quantities = [];

          this.$refs.form.resetValidation();
        }
      } catch (error) {
        console.log(error);
      }
    },
    // re-write this function
    setValue(item, index) {
      if (this.quantities[index] == 0) {
        this.assembly.parts[index] = null;
        return;
      }
      this.assembly.parts[index] = {
        uuid: item.uuid,
        name: item.name,
        quantity_to_assemble: item.quantity_to_assemble,
        quantity_single: this.quantities[index],
        quantity_total:
          this.quantities[index] * this.assembly.quantity_to_assemble,
      };
    },
    recomputeQuantities() {
      this.overlimits = [];
      if (this.assembly.quantity_to_assemble == 0) return;
      else {
        this.assembly.parts = this.assembly.parts.map((el) => {
          if (el != null) {
            const total =
              el.quantity_single * this.assembly.quantity_to_assemble;
            if (total > el.quantity_to_assemble) {
              this.overlimits.push(`${el.name} has not enough pieces left`);
            }
            el.quantity_total =
              el.quantity_single * this.assembly.quantity_to_assemble;
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
.openproject {
  width: 100px;
  height: 100px;
}
</style>