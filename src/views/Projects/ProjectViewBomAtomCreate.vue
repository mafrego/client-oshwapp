<template>
  <div>
    <panel title="Create atom">
        <!-- TODO add input fields with relative rules -->
      <v-text-field label="name" :rules="[rules.required, rules.isAlphanumeric]" v-model="atom.name" ></v-text-field>
      <v-text-field label="description" :rules="[rules.required, rules.isDescription]" v-model="atom.description"></v-text-field>
      <v-text-field label="quantity" :rules="[rules.required, rules.isPositiveInt]" v-model="atom.quantity"></v-text-field>
      <v-text-field label="cost" :rules="[rules.required, rules.isPositiveFloat]" v-model="atom.cost" ></v-text-field>
      <v-text-field label="currency" :rules="[rules.required, rules.isCurrency]" v-model="atom.currency" ></v-text-field>
      <v-text-field label="code" :rules="[rules.required, rules.isAlphanumeric]" v-model="atom.code" ></v-text-field>
      <v-text-field label="link" :rules="[rules.http]" v-model="atom.link" ></v-text-field>
      <v-text-field label="vendor URL" :rules="[rules.http]" v-model="atom.vendorUrl" ></v-text-field>
      <v-text-field label="minimum order quantity" :rules="[rules.isPositiveInt]" v-model="atom.moq" ></v-text-field>
      <v-text-field label="lead time" :rules="[rules.isDuration]" v-model="atom.leadTime" ></v-text-field>
      <v-text-field label="material" :rules="[rules.isAlphanumeric]" v-model="atom.material" ></v-text-field>
      <v-text-field label="weight" :rules="[rules.isPositiveFloat]" v-model="atom.weight"></v-text-field>
      <v-text-field label="notes" :rules="[rules.isDescription]" v-model="atom.notes" id="id"></v-text-field>
    </panel>
    <div class="green--text" v-if="message">{{message}}</div>
    <div class="red--text" v-if="error">{{error}}</div>
    <v-btn 
      class="green" 
      @click="create"
      title="save atom"
     >
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
        isDescription: (value) => {
          const pattern = /[^,;]*$/;
          if(value) return pattern.test(value) || "any char but commas and semicolons"
          else return true
        },
        isCurrency: (value) => {
          const pattern = /[A-Z]{3}/;
          if(value) return pattern.test(value) || "only currency ISO 4217 e.g. EUR, USD";
          else return true
        },
        isAlphanumeric: (value) => {
          const pattern = /^[-0-9a-zA-Z_]+$/;
          if(value) return pattern.test(value) || "only alphanumeric hyphens underscores";
          else return true
        },
        http: (value) => {
          const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
          if(value) return pattern.test(value) || "Invalid http link";
          else return true
        },
        isPositiveFloat: (value) => {
          const pattern = /^[+-]?\d+(\.\d+)?$/;
          if(value) return pattern.test(value) || "Invalid float";
          else return true
        },
        isPositiveInt: (value) => {
          const pattern = /^[1-9]+[0-9]*$/;
          if(value) return pattern.test(value) || "only positive integer > 0";
          else return true
        },
        isDuration: (value) => {
          const pattern = /^P(?!$)(\d+(?:\.\d+)?Y)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?W)?(\d+(?:\.\d+)?D)?(T(?=\d)(\d+(?:\.\d+)?H)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?S)?)?$/;
          if(value) return pattern.test(value) || "only duration ISO 8601";
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