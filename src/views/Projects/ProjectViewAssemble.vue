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
        v-model="assembly.quantity"
        id="id"
      ></v-text-field>
      <!-- <v-text-field
        label="img url"
        :rules="[rules.required, rules.http]"
        v-model="assembly.imageUrl"
        id="id"
      ></v-text-field> -->
      <div class="danger-alert" v-if="error">{{error}}</div>
      <v-btn class="cyan" @click="create">Create assembly</v-btn>
      <br />
      <span>Checked names: {{ assembly.parts }}</span>
      <br />
      <span>Quantities: {{ quantities }}</span>
      <br />
      <!-- solution see https://stackoverflow.com/questions/52691527/use-v-model-with-a-checkbox-when-v-for-is-used-with-properties-of-an-object-->
      <div v-for="(value, key, index) in atoms" :key="index">
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
// import ProductService from "@/services/ProductService";
import AssemblyService from "@/services/AssemblyService";
// import ProjectService from "@/services/ProjectService";

export default {
  name: "ProjectViewAssemble",
  data() {
    return {
      assembly: {
        name: null,
        description: null,
        parts: [],
        quantity: 0,
        version: "0.0.1",
        type: "child"
      },
      quantities: [],
      error: null,
      // required: value => !!value || "Required",
      // atoms: null,
      atoms: [],
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
  props: {
    project: {
      type: Object
    },
    projectid: {
      type: String
    }
  },
  mounted() {
    this.atoms = this.project.consists_of.map(rel => rel.node);
  },
  methods: {
    async create() {
      this.error = null;
      const areAllFieldsFilledIn = Object.keys(this.assembly).every(
        key => !!this.assembly[key]
      );
      if (!areAllFieldsFilledIn) {
        this.error = "Please fill in all the required fields.";
        return;
      }
      try {
        this.assembly.quantities = this.quantities.filter(n => n);
        this.assembly.imageUrl = "https://oshwpublicbucket.s3.eu-central-1.amazonaws.com/images/comp100.png"
        // await AssemblyService.post(this.assembly);
        // console.log(this.projectId)
        await AssemblyService.assemble(this.assembly, this.projectId);
        // TODO fix this router problem
        // this.$router.push({
        //   name: 'project'
        // });
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
};
</script>

<style scoped>
.danger-alert {
  color: red;
}
</style>