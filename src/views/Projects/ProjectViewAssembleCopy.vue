<template>
  <div>
    <panel v-if="getProject.state === 'rooted'" title="root product">
      <v-container fluid>
        <v-layout row justify-start>
          <v-flex xs3>
            <span class="font-weight-bold item-name"
              >{{ getAssemblableProducts[0].name }} @{{
                getAssemblableProducts[0].itemNumber
              }}</span
            >
          </v-flex>
          <v-flex sm2>
            <v-btn @click="release" class="yellow">release</v-btn>
          </v-flex>
          <v-flex sm1>
            <v-btn
              class="red ml-1"
              @click="takeApart(getAssemblableProducts[0].uuid)"
              title="disassemble"
            >
              <v-icon>construction</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs1> </v-flex>
        </v-layout>
      </v-container>
    </panel>
    <panel v-if="getProject.state === 'assembling'" title="Assembly panel">
      <v-container fluid>
        <v-form ref="form">
          <div v-if="getProject.state != 'rooted'">
            <v-layout row justify-space-between>
              <v-flex sm3>
                <v-text-field
                  label="assembly name"
                  :rules="[
                    rules.singleName,
                    rules.required,
                    rules.isAlphanumeric,
                  ]"
                  v-model="assembly.name"
                  solo-inverted
                  dense
                  hint="name"
                ></v-text-field>
              </v-flex>
              <v-flex sm2>
                <v-text-field
                  @keydown="preventNonNumericalInput($event)"
                  :rules="[rules.required, rules.isPositiveInt]"
                  type="number"
                  min="1"
                  v-model.number="assembly.quantity_to_assemble"
                  @input="recomputeQuantities"
                  solo-inverted
                  dense
                  hint="quantity"
                />
              </v-flex>
              <v-flex sm6>
                <v-text-field
                  label="assembly description"
                  :rules="[rules.required, rules.isDescription]"
                  v-model="assembly.description"
                  solo-inverted
                  dense
                  hint="description"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row justify-space-between>
              <v-flex sm12>
                <v-textarea
                  label="assembly instructions"
                  :rules="[rules.isDescription]"
                  v-model="assembly.instruction"
                  solo
                  dense
                  rows="1"
                  hint="assembly instructions"
                ></v-textarea>
              </v-flex>
            </v-layout>
            <v-layout row justify-space-between>
              <v-flex sm12>
                <v-text-field
                  label="assembly link"
                  :rules="[rules.isHTTP]"
                  v-model="assembly.link"
                  solo-inverted
                  dense
                  hint="link"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row justify-space-between>
              <v-flex sm1>
                <v-btn class="green" @click="startAssembling" title="assemble">
                  <v-icon>build</v-icon>
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
              <v-flex sm8>
                <div class="green--text" v-if="message">{{ message }}</div>
                <div class="red--text" v-if="error">{{ error }}</div>
                <div class="red--text" v-if="overlimits.length != 0">
                  {{ overlimits.join(", ") }}
                </div>
              </v-flex>
            </v-layout>
            <!-- <br />
          <span>assembly.parts: {{ assembly.parts }}</span>
          <br />
          <span>quantities: {{ quantities }}</span>
          <br />
          <span>overlimits: {{ this.overlimits }}</span>
          <br /> -->
          </div>

          <div v-for="(item, index) in getAssemblableProducts" :key="index">
            <v-layout row justify-start v-if="getProject.state != 'rooted'">
              <v-flex xs3>
                <span
                  v-if="item._labels.includes('Atom')"
                  class="font-weight-bold item-name"
                  >{{ item.name }} #{{ item.itemNumber }}</span
                >
                <span v-else class="font-weight-bold item-name"
                  >{{ item.name }} @{{ item.itemNumber }}</span
                >
                <br />
                left to assemble: {{ item.quantity_to_assemble }}
                <v-text-field
                  @keydown="preventNonNumericalInput($event)"
                  :rules="[maxQuantity(item.quantity_to_assemble)]"
                  type="number"
                  label="qty per assembly"
                  min="0"
                  max="100"
                  step="1"
                  v-model="quantities[index]"
                  @input="
                    setValue(item, index);
                    recomputeQuantities();
                  "
                  solo-inverted
                  dense
                  hint="qty per assembly"
                />
              </v-flex>
              <v-flex sm1>
                <v-btn
                  v-if="!item._labels.includes('Atom')"
                  class="red ml-1"
                  @click="takeApart(item.uuid)"
                  title="disassemble"
                >
                  <v-icon>construction</v-icon>
                </v-btn>
              </v-flex>
              <v-flex class="image" sm2>
                <img
                  class="atom-image"
                  :src="item.imageUrl"
                  :alt="item.name"
                  @mouseover="hover = item.uuid"
                  @mouseleave="hover = null"
                  @click="fix(item.uuid)"
                />
              </v-flex>
              <v-flex sm6>
                <v-card
                  v-if="hover === item.uuid || fixed === item.uuid"
                  width="100%"
                  outlined
                  raised
                  dark
                  elevation-24
                  class="card"
                >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      icon
                      class="grey"
                      x-small
                      @click="fix(null)"
                      title="close"
                    >
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-card-actions>
                  <ul>
                    <li>{{ item.description }}</li>
                    <li>{{ item.unitCost }} {{ getProject.currency }}</li>
                    <li v-if="item.GTIN">GTIN: {{ item.GTIN }}</li>
                    <li v-if="item.SKU">SKU: {{ item.SKU }}</li>
                    <li v-if="item.vendorUrl">
                      <a :href="item.vendorUrl" target="_blank">vendor</a>
                    </li>
                    <li v-if="item.link">
                      <a :href="item.link" target="_blank">link</a>
                    </li>
                    <li v-if="item.instruction">{{ item.instruction}}</li>
                  </ul>
                </v-card>
              </v-flex>
            </v-layout>
          </div>
        </v-form>
      </v-container>
    </panel>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import AssemblyService from "@/services/AssemblyService";

export default {
  name: "ProjectViewAssembleCopy",
  data() {
    return {
      assembly: {
        name: null,
        description: null,
        instruction: null,
        link: null,
        parts: [],
        quantity_to_assemble: 1,
        quantity: 1,
      },
      quantities: [],
      message: null,
      error: null,
      overlimits: [], //used for storing errror messages
      fixed: null,
      hover: null,
      isLoading: false,
      rules: {
        required: (value) => !!value || "Required.",
        natural: (value) => {
          const pattern = /^([1-9]\d*)$/;
          return pattern.test(value) || "entry must be a positive integer";
        },
        isPositiveInt: (value) => {
          const pattern = /^[1-9]+[0-9]*$/;
          if (value) return pattern.test(value) || "only positive integers > 0";
          else return true;
        },
        isDescription: (value) => {
          const pattern = /^[^,;]*$/;
          if (value) return pattern.test(value) || "any char except for commas and semicolons";
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
        isHTTP: (value) => {
          const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
          if (value) return pattern.test(value) || "Invalid http link";
          else return true;
        },
        singleName: (value) =>
          !(
            this.getAtomNames.includes(value) ||
            this.getAssembliesNames.includes(value)
          ) || "name not available!",
        string: (value) => {
          const pattern = /^[^,;"]+$/;
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
      // "getLoading",
      // "getError",
      // "getAllProductNames",
      "getAssemblyCounter",
      "getAssembliesNames",
      "getAtomNames",
    ]),
    // TODO find substitute with getters and remove states
    ...mapState({
      loading: (state) => state.projects.loading,
    }),
  },
  created() {
    this.fetchAssemblableProducts();
    this.fetchAllProducts();
  },
  methods: {
    ...mapActions([
      "fetchAssemblableProducts",
      "assembleCopy",
      "fetchAllProducts",
      "disassemble",
      "updateProjectState",
    ]),
    fix(uuid) {
      this.fixed = uuid;
    },
    // this function prevents Firefox from allowing chars other than digits
    preventNonNumericalInput(event) {
      const char = String.fromCharCode(event.keyCode);
      if (!/[0-9\b\t]/.test(char)) {
        event.preventDefault();
      }
    },
    async release() {
      const args = {
        state: "released",
        version: "0.0.1",
        assemblyID: this.getAssemblableProducts[0].uuid,
      };
      const ret = await this.updateProjectState(args);
      if (ret === 200) {
        this.$router.push({
          name: "projects",
        });
      }
    },
    maxQuantity(maxQty) {
      return (value) =>
        value * this.assembly.quantity_to_assemble <= maxQty ||
        "not enough pieces!";
    },
    async takeApart(uuid) {
      await this.disassemble(uuid);
    },
    async startAssembling() {
      this.message = null;
      this.error = null;
      this.assembly.parts = this.assembly.parts.filter((el) => {
        return el != null;
      });
      this.assembly.quantity = this.assembly.quantity_to_assemble;
      // delete not required properties whenever corresponding entries are empty
      if (!this.assembly.instruction) {
        delete this.assembly.instruction;
      }
      if (!this.assembly.link) {
        delete this.assembly.link;
      }
      // check if required properties are filled in
      if (!this.assembly.name || !this.assembly.description) {
        this.error = "Please fill in all the required fields";
        return;
      }
      if (
        this.getAtomNames.includes(this.assembly.name) ||
        this.getAssembliesNames.includes(this.assembly.name)
      ) {
        this.error = "Please change assembly name";
        return;
      }
      if (this.overlimits.length != 0) {
        this.error = "Please check part quantities and try again!";
        return;
      }
      if (this.assembly.parts.length === 0) {
        this.error = "Please select parts to assemble!";
        return;
      }
      // add itemNumber to assembly
      this.assembly.itemNumber = this.getAssemblyCounter + 1;
      try {
        this.isLoading = true
        const response = await AssemblyService.assembleCopy(
          this.assembly,
          this.getProject.uuid
        );
        // console.log(response);
        if (response.status == 201) {
          if (
            response.data.length === 1 &&
            response.data[0].quantity_to_assemble === 1
          ) {
            this.updateProjectState({ state: "rooted" });
          }
          this.message = `product ${this.assembly.name} assembled`;
          this.assembleCopy(response.data);

          this.assembly.name = null;
          this.assembly.description = null;
          this.assembly.instruction = null;
          this.assembly.link = null;
          this.assembly.parts = [];
          this.assembly.quantity_to_assemble = 1;
          this.quantities = [];

          this.$refs.form.resetValidation();
        }
      } catch (error) {
        console.log(error);
        this.error = error.response.data.message;
      } finally {
        this.isLoading = false
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
              this.overlimits.push(`${el.name} has not enough pieces!`);
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
.item-name {
  font-size: 150%;
  overflow-wrap: break-word;
}
.image {
  display: flex;
  justify-content: center;
  /* align-items: center; */
}
.atom-image {
  width: 100px;
  height: 100px;
  cursor: pointer;
}
.openproject {
  width: 100px;
  height: 100px;
}
:any-link {
  text-decoration: none;
}
</style>