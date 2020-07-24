<template>
  <div>
    <panel title="Atom Metadata">
      <v-text-field
        label="name"
        :rules="[rules.required]"
        v-model="compound.name"
        id="id"
      ></v-text-field>
      <v-text-field
        label="description"
        :rules="[rules.required]"
        v-model="compound.description"
        id="id"
      ></v-text-field>
      <!-- <v-text-field
        label="img url"
        :rules="[rules.required, rules.http]"
        v-model="compound.imageUrl"
        id="id"
      ></v-text-field> -->
      <div class="danger-alert" v-if="error">{{error}}</div>
      <v-btn class="cyan" @click="create">Create compound</v-btn>
      <br />
      <span>Checked names: {{ compound.parts }}</span>
      <br />
      <span>Quantities: {{ quantities }}</span>
      <br />
      <!-- solution see https://stackoverflow.com/questions/52691527/use-v-model-with-a-checkbox-when-v-for-is-used-with-properties-of-an-object-->
      <div v-for="(value, key, index) in products" :key="index">
        <v-layout>
          <v-flex xs3>
            <div class="atom-name">{{value.name}}</div>
            <input
              v-on:click="toggleQuantity(key)"
              type="checkbox"
              :id="key"
              :value="value.uuid"
              v-model="compound.parts"
            />
            <br />
            <input
              v-if="compound.parts.includes(value.uuid)"
              type="number"
              :id="key"
              min="1"
              max="1000"
              step="1"
              v-model="quantities[key]"
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
// import AtomService from "@/services/AtomService";
import ProductService from "@/services/ProductService";
import CompoundService from "@/services/CompoundService";

export default {
  data() {
    return {
      compound: {
        name: null,
        description: null,
        parts: []
      },
      quantities: [],
      error: null,
      // required: value => !!value || "Required",
      // atoms: null,
      products: null,
      rules: {
        required: value => !!value || "Required.",
        counter: value => value.length >= 8 || "Min 8 characters",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        http: value => {
          const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
          return pattern.test(value) || "Invalid http link";
        },
        
      }
    };
  },
  methods: {
    async create() {
      this.error = null;
      const areAllFieldsFilledIn = Object.keys(this.compound).every(
        key => !!this.compound[key]
      );
      if (!areAllFieldsFilledIn) {
        this.error = "Please fill in all the required fields.";
        return;
      }
      try {
        this.compound.quantities = this.quantities.filter(n => n);
        // TODO set imageUrl on server
        this.compound.imageUrl = "https://oshwapp.s3.eu-central-1.amazonaws.com/service/assembly.png"
        await CompoundService.post(this.compound);
        this.$router.push({
          name: "products"
        });
      } catch (err) {
        console.log(err);
      }
    },
    // TODO change to toggle quantity value 1 null
    toggleQuantity : function(key) {
      if(this.quantities[key])
        this.quantities[key] = null
      else
        this.quantities[key] = 1
      }
  },
  async created() {
    // this.atoms = (await AtomService.index()).data;
    this.products = (await ProductService.index()).data;
  }
};
</script>

<style scoped>
.danger-alert {
  color: red;
}
</style>