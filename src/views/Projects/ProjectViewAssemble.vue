<template>
  <div>
    <panel title="Assembly metadata">
      <v-text-field
        label="name"
        :rules="[rules.required]"
        v-model="assembly.name"
        id="id"
      ></v-text-field>
      <v-text-field
        label="description"
        :rules="[rules.required]"
        v-model="assembly.description"
        id="id"
      ></v-text-field>
      <v-text-field
        label="quantity"
        :rules="[rules.required]"
        v-model="assembly.quantity_to_assemble"
        id="id"
      ></v-text-field>
      <div class="danger-alert" v-if="error">{{error}}</div>
      <v-btn class="cyan" @click="create">Create assembly</v-btn>
      <br />
      <span>Checked names: {{ assembly.parts }}</span>
      <br />
      <span>Quantities: {{ quantities }}</span>
      <br />
      <!-- solution see https://stackoverflow.com/questions/52691527/use-v-model-with-a-checkbox-when-v-for-is-used-with-properties-of-an-object-->
      <div v-for="(value, key, index) in assemblables" :key="index">
        <v-layout>
          <v-flex xs3>
            <div class="atom-name">{{value.name}}</div>
            <input
              v-on:click="toggleQuantity(key)"
              type="checkbox"
              :id="key"
              :value="value.uuid"
              v-model="assembly.parts"
            />
            <br />
            <input
              v-if="assembly.parts.includes(value.uuid)"
              type="number"
              :id="key"
              min="1"
              max="100"
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
import {mapGetters, mapActions, mapState} from 'vuex'

export default {
  name: "ProjectViewAssemble",
  data() {
    return {
      assembly: {
        name: null,
        description: null,
        parts: [],
        quantity_to_assemble: 1,
        quantity: 1,
        version: "0.0.1",
        type: "child"
      },
      quantities: [],
      error: null,
      atoms: [],
      rules: {
        required: value => !!value || "Required.",
        counter: value => value.length >= 8 || "Min 8 characters",
      }
    };
  },
  computed: {
    ...mapGetters(['getProject', 'getAssemblableProducts']),
    ...mapState({ assemblables: state => state.projects.assemblableProducts})
  },
  created(){
    this.fetchAssemblableProducts(this.getProject.uuid)
  },
  methods: {
    ...mapActions(['fetchAssemblableProducts', 'assemble']),
    create() {
      this.error = null;
      const areAllFieldsFilledIn = Object.keys(this.assembly).every(
        key => !!this.assembly[key]
      );
      if (!areAllFieldsFilledIn) {
        this.error = "Please fill in all the required fields.";
        return;
      }
        this.assembly.quantities = this.quantities.filter(n => n);
        this.assembly.quantity = this.assembly.quantity_to_assemble
        // // TODO set imageUrl on server properly
        this.assembly.imageUrl = "https://oshwapp.s3.eu-central-1.amazonaws.com/service/assembly.png"
        this.assemble(this.assembly)
    },
    // TODO change to toggle quantity value 1 null
    toggleQuantity : function(key) {
      if(this.quantities[key])
        this.quantities[key] = null
      else
        this.quantities[key] = 1
      }
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