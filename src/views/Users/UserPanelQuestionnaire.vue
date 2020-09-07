<template>
  <div>
    <v-layout column>
      <v-flex xs1>
        <v-text-field
          v-model="questionnaire.answer0"
          :rules="[rules.isAlphanumeric]"
          label="What would you 0...?"
        ></v-text-field>
        <v-text-field
          v-model="questionnaire.answer1"
          :rules="[rules.isAlphanumeric]"
          label="What would you 1...?"
        ></v-text-field>
        <v-text-field
          v-model="questionnaire.answer2"
          :rules="[rules.isAlphanumeric]"
          label="What would you 2...?"
        ></v-text-field>
        <v-text-field
          v-model="questionnaire.answer3"
          :rules="[rules.isAlphanumeric]"
          label="What would you 3...?"
        ></v-text-field>

        <v-btn class="yellow" @click="update()" title="update questionnaire">
          <v-icon>save</v-icon>
        </v-btn>
        <div v-if="this.message" class="ml-2 msg">
          <span class="green--text">{{message}}</span>
        </div>
        <div v-if="error" class="red--text msg ml-2">{{error}}</div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import UserService from "@/services/UserService.js";
import { mapActions } from "vuex";

export default {
  name: "UserPanelQuestionnaire",
  data() {
    return {
      message: "",
      error: "",
      questionnaire: {},
      rules: {
        // required: (value) => !!value || "Required.",
        // isDescription: (value) => {
        //   const pattern = /^[-a-zA-Z0-9 _.]*$/;
        //   if(value) return pattern.test(value) || "Only alphanumeric, dots, hyphens, underscore chars";
        //   else return true
        // },
        isAlphanumeric: (value) => {
          const pattern = /^[-a-zA-Z0-9 _.]*$/;
          if (value)
            return (
              pattern.test(value) ||
              "Only alphanumeric, dots, hyphens, underscore chars and blank spaces"
            );
          else return true;
        },
        // isCurrency: (value) => {
        //   const pattern = /[A-Z]{3}/;
        //   if(value) return pattern.test(value) || "only currency ISO 4217";
        //   else return true
        // },
        // isURL: (value) => {
        //   const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
        //   if(value) return pattern.test(value) || "invalid URL";
        //   else return true
        // },
        // isPositiveFloat: (value) => {
        //   const pattern = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/;
        //   if(value) return pattern.test(value) || "only positive float";
        //   else return true
        // },
        // isPositiveInt: (value) => {
        //   const pattern = /^[1-9]+[0-9]*$/;
        //   if(value) return pattern.test(value) || "only positive integers > 0";
        //   else return true
        // },
        // isDuration: (value) => {
        //   const pattern = /^P(?!$)(\d+(?:\.\d+)?Y)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?W)?(\d+(?:\.\d+)?D)?(T(?=\d)(\d+(?:\.\d+)?H)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?S)?)?$/;
        //   if(value) return pattern.test(value) || "only duration ISO 8601";
        //   else return true
        // }
      },
    };
  },
  async mounted() {
    const obj = this.$store.state.user.fills_in.node;
    // shallow copy
    const copied = Object.assign({}, obj);
    this.questionnaire = copied;
  },
  methods: {
    ...mapActions(["setQuestionnaire"]),
    async update() {
      try {
        this.message = "";
        this.error = "";
        this.questionnaire.dateTime = new Date();
        const response = await UserService.updateQuestionnaire(
          this.questionnaire
        );
        if (response.status === 200) {
          this.message = "questionnaire updated";
          this.setQuestionnaire(response.data);
        } else {
          this.error = "questionnaire not updated";
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
</style>