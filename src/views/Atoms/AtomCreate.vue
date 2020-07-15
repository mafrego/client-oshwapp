<template>
  <div>
    <panel title="Atom Metadata">
      <v-text-field label="name"  :rules="[rules.required]" v-model="atom.name" id="id"></v-text-field>
      <v-text-field
        label="description"
        :rules="[rules.required]"
        v-model="atom.description"
        id="id"
      ></v-text-field>
      <v-text-field label="weight"  :rules="[rules.required, rules.float]" v-model="atom.weight" id="id"></v-text-field>
      <v-text-field label="material"  :rules="[rules.required]" v-model="atom.material" id="id"></v-text-field>
      <!-- TODO multiple choice weight units -->
      <v-text-field
        label="weight unit"
        :rules="[rules.required]"
        v-model="atom.weightUnit"
        id="id"
      ></v-text-field>
      <!-- <v-text-field label="img url" :rules="[rules.required, rules.http]" v-model="atom.imageUrl" id="id"></v-text-field> -->
    </panel>
    <div class="danger-alert" v-if="error">{{error}}</div>
    <v-btn class="cyan" @click="create">Create atom</v-btn>
  </div>
</template>

<script>
import AtomService from "@/services/AtomService";

export default {
  data() {
    return {
      atom: {
        name: null,
        description: null,
        // atom: 1,
        weight: null,
        material: null,
        weightUnit: null
      },
      error: null,
      // required: value => !!value || "Required"
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
        float: value => {
          const pattern = /^[+-]?\d+(\.\d+)?$/;
          return pattern.test(value) || "Invalid float";
        },
      } 
    };
  },
  methods: {
    async create() {
      this.error = null;
      const areAllFieldsFilledIn = Object.keys(this.atom).every(
        key => !!this.atom[key]
      );
      if (!areAllFieldsFilledIn) {
        this.error = "Please fill in all the required fields.";
        return;
      }
      try {
        //TODO move url in server and in general solve problem with images and AWS S3
        // this.atom.imageUrl = "https://oshwpublicbucket.s3.eu-central-1.amazonaws.com/images/"+this.atom.name+".png"
        await AtomService.post(this.atom);
        this.$router.push({
          name: "atoms"
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.danger-alert {
  color: red;
}
</style>