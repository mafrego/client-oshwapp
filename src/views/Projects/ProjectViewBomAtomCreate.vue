<template>
  <div>
    <panel title="Create atom">
        <!-- TODO add input fields with relative rules -->
      <v-text-field label="name" :rules="[rules.required, rules.isAlphanumeric]" v-model="atom.name" id="id"></v-text-field>
      <v-text-field
        label="description"
        :rules="[rules.required]"
        v-model="atom.description"
        id="id"
      ></v-text-field>
      <v-text-field
        label="quantity"
        :rules="[rules.required, rules.positiveInt]"
        v-model="atom.quantity"
        type="number"
        min="1"
        id="id"
      ></v-text-field>
      <v-text-field label="link" :rules="[rules.http]" v-model="atom.link" id="id"></v-text-field>
      <v-text-field
        label="weight"
        :rules="[rules.float]"
        v-model="atom.weight"
        id="id"
      ></v-text-field>
      <v-text-field label="material" :rules="[rules.required]" v-model="atom.material" id="id"></v-text-field>
    </panel>
    <div class="green--text" v-if="message">{{message}}</div>
    <div class="red--text" v-if="error">{{error}}</div>
    <v-btn class="green" @click="create">
      <v-icon>save</v-icon>
    </v-btn>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "ProjectViewBomAtomCreate",
  data() {
    return {
      atom: {},
      message: "",
      error: "",
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length >= 8 || "Min 8 characters",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        isAlphanumeric: (value) => {
          const pattern = /^[-0-9a-zA-Z_]+$/;
          if(value) return pattern.test(value) || "Only alphanumeric, hyphens or underscores chars!";
          else return true
        },
        http: (value) => {
          const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
          if(value) return pattern.test(value) || "Invalid http link";
          else return true
        },
        float: (value) => {
          const pattern = /^[+-]?\d+(\.\d+)?$/;
          if(value) return pattern.test(value) || "Invalid float";
          else return true
        },
        positiveInt: (value) => {
          const pattern = /^[1-9]+[0-9]*$/;
          if(value) return pattern.test(value) || "only positive integers > 0";
          else return true
        }
      }
    }
  },
    methods: {
        ...mapActions(["createAtom"]),
        async create(){
            this.message = ""
            this.error = ""
            const response = await this.createAtom(this.atom)
            // console.log(response)
            if(response.status === 201){
                this.message = "added new atom to BOM"
            } else {
                this.error = "problems in creating new atom"
            }
        }
    }
};

</script>

<style scoped>
</style>